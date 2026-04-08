const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const port = process.argv.length > 2 ? process.argv[2] : 4000;
const authCookieName = 'token';
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    await DB.updateUserRemoveAuth(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.userName = user.email;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

apiRouter.get('/friends', verifyAuth, async (req, res) => {
    const userName = req.userName
    let res_obj = {}
    let status = 500

    status = 200
    res_obj.message = ""
    res_obj.friends = await DB.getFriends(userName)

    res.status(status).send(res_obj);
});

const updateFriends = async (req, res) => {
    const userName = req.userName;
    const requestedFriend = req.body.requestedFriend
    let status = 200
    let res_obj = {}
    
    if (userName === requestedFriend) {
        status = 400
        res_obj.message = "Cannot add yourself as a friend."
        res_obj.friends = await DB.getFriends(userName)
    } else if (!(await DB.getUser(requestedFriend))) {
        status = 400
        res_obj.message = "Requested friend does not exist."
        res_obj.friends = await DB.getFriends(userName)
    } else {
        status = 200
        await DB.addFriend(userName, requestedFriend)
        res_obj.message = `Added or updated ${requestedFriend} as a friend.`
        res_obj.friends = await DB.getFriends(userName)
    } 
    res.status(status).send(res_obj);
}

apiRouter.post('/make-friend', verifyAuth, updateFriends);

apiRouter.delete('/friends', verifyAuth, async (req, res) => {
    let res_obj = {}
    const userName = req.userName
    const status = 200
    res_obj.message = "Reset friends."
    await DB.resetFriends(userName)
    res_obj.friends = await DB.getFriends(userName)
    
    res.status(status).send(res_obj);
});

apiRouter.get('/ratings', verifyAuth, async (req, res) => {
    const userName = req.userName
    let res_obj = {}
    let status = 500

    status = 200
    res_obj.message = "";
    res_obj.ratings = await DB.getRatings(userName);

  res.status(status).send(res_obj);
});

apiRouter.post('/make-rating', verifyAuth, async (req, res) => {
    const userName = req.userName;
    const ratingObj = req.body.rating

    if (!ratingObj || !ratingObj.name) {
        return res.status(400).send({message: 'Musical name is required.'})
    }
    await DB.addRating(userName, ratingObj)
    const ratings = await DB.getRatings(userName)
    res.status(200).send({
            message: `Created rating for ${ratingObj.name}`,
            ratings: ratings
        });
});

apiRouter.delete('/ratings', verifyAuth, async (req, res) => {
    let status = 200
    let res_obj = {}
    const userName = req.userName
    await DB.resetRatings(userName)
    res_obj.message = "Reset ratings."
    res_obj.ratings = await DB.getRatings(userName)
    res.status(status).send(res_obj);
});

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);