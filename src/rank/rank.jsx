import React from 'react';
import {useState, useEffect} from 'react';
import './rank.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {RankingNotifier, RankingEvent} from './rankingNotifier';

export function Rank({ userName }) {
    const [currentRating, setCurrentRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [musicalName, setMusicalName] = useState('');
    const [allRatings, setAllRatings] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        RankingNotifier.addHandler(handleRankingEvent);

        return () => {
            RankingNotifier.removeHandler(handleRankingEvent);
        };
    }, []);

    function handleRankingEvent(event) {
        setNotifications((curr) => [event, ...curr].slice(0, 5));
    }

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
            fetch('/api/ratings')
                .then(res => res.json())
                .then(body  => {
                    console.log(body)
                    setAllRatings(body.ratings)
                })
                .catch(() => setStatusMessage('Failed to load ratings.'))
    }, [])
    
    const submitRating = async () => {
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
        const newRating = {
            name: musicalName,
            rating: currentRating
        };

        
        setMusicalName('');
        setCurrentRating(0);
        
        const res = await fetch('/api/make-rating', {
            method: 'post', 
            body: JSON.stringify({rating: newRating}),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            }
        })
        if (res.status === 200) {
            const body = await res.json();
            setAllRatings(body.ratings);
            RankingNotifier.broadcastEvent(userName, RankingEvent.User, {
                msg: `just ranked ${newRating.name} ${newRating.rating} stars!`
             });
        } else {
            const body = await res.json();
            setStatusMessage(`Failed to submit rating: ${body.message}`)
        }
        
    }

    const resetRatings = async () => {
        const res = await fetch('/api/ratings', {method: 'delete'})
        const body = await res.json()
        if (res.status === 200) {
            setStatusMessage('Reset ratings.')
            setAllRatings([])
        } else {
            setStatusMessage(`Failed to reset ratings: ${body.message}`)
        }

    }
  return (
    <main className="container-fluid flex-grow-1 d-flex flex-column align-items">
      <div className="row">
        <div className="col-md-3">
            <h4 className="area-header">Notifications:</h4>
      <div className="notification-col">
        <ul> 
            {notifications.map((notif, i) => (
                <div key={i}><span className="notification">{typeof notif === 'string' ? notif : `${notif.from} ${notif.value.msg}`}</span></div>
            ))}
        </ul>
      </div>
      <br />

      <div>
        {statusMessage && <div className="alert">
                {statusMessage}
                </div>}
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