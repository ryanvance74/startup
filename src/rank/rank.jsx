import React from 'react';
import {useState, useEffect} from 'react';
import './rank.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Rank() {
    const [currentRating, setCurrentRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [musicalName, setMusicalName] = useState('');
    const [allRatings, setAllRatings] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');
    const [notifications, setNotifications] = useState([]);
    const activityTemplates = [
            "James just rated Hamilton 5/5!",
            "Leo rated Phantom of the Opera 4/5!",
            "Gabby rated Wicked 5/5!",
            "José rated Miss Saigon 2/5!",
            "Leah rated Anastasia 3/5!",
            "Isla rated Beauty and the Beast 1/5!"
        ];
    useEffect(() => {
        const interval = setInterval(() => {
        const nextMsg = Math.floor(Math.random() * activityTemplates.length);
        
        setNotifications((prev) => {
            const updatedNotifications = [activityTemplates[nextMsg], ...prev]
            return updatedNotifications.slice(0,3);
            })
        }, 5000)
        return () => clearInterval(interval)
    }, [])
    
    useEffect(() => {
        const saved = localStorage.getItem('musical_ratings');
        if (saved) setAllRatings(JSON.parse(saved))
    }, [])
    
    const submitRating = () => {
        if (!musicalName.trim()) {
            setStatusMessage('You must enter a musical name before you submit a rating.')
            setTimeout(() => {
                setStatusMessage('');
            }, 3000)
            return;
        }
        if (currentRating === 0) {
            setStatusMessage('You must select a rating for the musical first.')
            setTimeout(() => {
                setStatusMessage('');
            }, 3000)
            return;
        }
        setStatusMessage(`You rated ${musicalName} ${currentRating} stars!`)
        setTimeout(() => {
                setStatusMessage('');
        }, 3000)
        const newRating = {
            name: musicalName,
            rating: currentRating
        };

        const dupIdx = allRatings.findIndex(
            (tempRating) => tempRating.name === newRating.name
        );
        let updatedRatings;
        if (dupIdx !== -1) {
            updatedRatings = [...allRatings];
            updatedRatings[dupIdx] = {...updatedRatings[dupIdx], rating: currentRating};
        } else {
            updatedRatings = [...allRatings, newRating];
        }
        setAllRatings(updatedRatings);
        setMusicalName('');
        setCurrentRating(0);
        localStorage.setItem('musical_ratings', JSON.stringify(updatedRatings));
    }
    const resetRatings = () => {
        setAllRatings([])
        localStorage.setItem('musical_ratings', JSON.stringify([]))
        setStatusMessage('Reset ratings list.')
                setTimeout(() => {
                    setStatusMessage('');
                }, 3000)
    }
  return (
    <main className="container-fluid flex-grow-1 d-flex flex-column align-items">
      <div className="row">
        <div className="col-md-3">
            <h4 className="area-header">Notifications:</h4>
      <div className="notification-col">
        <ul> 
            {notifications.map((notif) => (
                <div><span className="notification">{notif}</span></div>
            ))}
        </ul>
      </div>
      <br />

      <div>
        <label>Musical:</label>
        <input id="musical-name" type="text" placeholder="Hamilton" value={musicalName} onChange={(e) => setMusicalName(e.target.value)}></input>
      </div>
      <div className="input-group mb-3">
        <label className="input-group-text" for="count">How many stars is this musical?</label>
        {[1,2,3,4,5].map((star) => (
            <span key={star}
                    onClick={() => setCurrentRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}>
                {star <= (hover || currentRating) ? '★' : '☆'}
            </span>
        ))}
      </div>
      <br />
      <div>
        <Button variant='primary' onClick={submitRating}>
                        Submit Rating
                        </Button>
      </div>
      <div>
                        <Button variant='primary' onClick={resetRatings}>
                        Reset Ratings
                        </Button>
                    </div>
      <br />
        </div>
        {statusMessage && <div className="alert">
                {statusMessage}
                </div>}
      <div className="col-md-6">
                <h4 className="text-center" id="table-title"> Ratings </h4>
                <table className="table table-success table-striped-columns">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Musical</th>
                        <th>Rating</th>
                    </tr>
                    </thead>

                    <tbody>
                    {allRatings.map((musical, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td> 
                            <td>{musical.name}</td>
                            <td>{musical.rating}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
      </div>
    </main>
  );
}