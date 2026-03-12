const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const db = {}
const users = []
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
  db[email] = {}
  db[email].friends = new Set()
  db[email].ratings = []
  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
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
    delete user.token;
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

apiRouter.get('/friends', verifyAuth, (req, res) => {
    const userName = req.userName
    let res_obj = {}
    let status = 500

    status = 200
    res_obj.message = ""
    res_obj.friends = [...db[userName].friends]

    res.status(status).send(res_obj);
});

const updateFriends = (req, res) => {
    const userName = req.userName;
    const requestedFriend = req.body.requestedFriend
    let status = 500
    let res_obj = {}
    if (!(userName in db)) {
        db[userName] = {}
        db[userName].friends = new Set();
    }

    if (!(requestedFriend in db)) {
        status = 400
        res_obj.message = "Requested friend does not exist."
        res_obj.friends = [...db[userName].friends]
    } else if (db[userName].friends.has(requestedFriend)) {
        status = 400
        res_obj.message = `Already friends with ${requestedFriend}`
        res_obj.friends = [...db[userName].friends]
    } else {
        db[userName].friends.add(requestedFriend)
        res_obj.message = `Added ${requestedFriend} as a friend!`
        res_obj.friends = [...db[userName].friends]
    }
    res.status(status).send(res_obj);
}

apiRouter.post('/make-friend', verifyAuth, updateFriends);

apiRouter.delete('/friends', verifyAuth, (req, res) => {
    let status = 500
    let res_obj = {}
    const userName = req.userName
    status = 200
    db[userName].friends = new Set()
    res_obj.message = "Reset friends."
    res_obj.friends = []
    
    res.status(status).send(res_obj);
});

apiRouter.get('/ratings', verifyAuth, (req, res) => {
    const userName = req.userName
    let res_obj = {}
    let status = 500

    status = 200
    res_obj.message = ""
    res_obj.ratings = db[userName].ratings

  res.status(status).send(res_obj);
});

apiRouter.post('/make-rating', verifyAuth, (req, res) => {
    const userName = req.userName;
    const ratingObj = req.body.rating
    const ratings = db[userName].ratings
    const dupIdx = ratings.findIndex(r => 
        r.name === ratingObj.name
    )
    if (!ratingObj || !ratingObj.name) {
        return res.status(400).send({message: 'Musical name is required.'})
    }
    if (dupIdx !== -1) {
        ratings[dupIdx].rating = ratingObj.rating
        res.status(200).send({
            message: `Updated rating for ${ratingObj.name}`,
            ratings: ratings
        })
    } else {
        db[userName].ratings.push({
            name: ratingObj.name,
            rating: ratingObj.rating
        })
        res.status(200).send({
            message: `Created rating for ${ratingObj.name}`,
            ratings: ratings
        });
    }
});

apiRouter.delete('/ratings', verifyAuth, (req, res) => {
    let status = 200
    let res_obj = {}
    const userName = req.userName
    status = 200
    db[userName].ratings = []
    res_obj.message = "Reset ratings."
    res_obj.ratings = []
    res.status(status).send(res_obj);
});

app.listen(port, () => {
  console.log(`Web service listening on port ${port}`);
});