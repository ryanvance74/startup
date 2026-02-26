import React from 'react';
import './rank.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Rank() {
    const [currentRating, setCurrentRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [musicalName, setMusicalName] = useState('');
    const [allRatings, setAllRatings] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('musical_ratings');
        if (saved) setAllRatings(JSON.parse(saved))
    })
    
    const submitRating = () => {
        if (currentRating === 0) {
            alert('You must select a rating for the musical first.');
            return;
        }
        alert(`You rated ${musicalName} ${currentRating} stars!`)
        const newRating = {
            musical: musicalName,
            rating: currentRating
        }
        const updatedRatings = [...allRatings, newRating]
        setAllRatings(updatedRatings)
        localStorage.setItem('musical_ratings', JSON.stringify(updatedRatings))
    }

  return (
    <main className="container-fluid flex-grow-1 d-flex flex-column align-items">
      <div className="row">
        <div className="col-md-3">
            <h4 className="area-header">Notifications:</h4>
      <div className="notification-col">
        <ul> 
            <div><span className="notification">Your friend Tim rated Les Mis 3 out of 5</span></div>
            <div><span className="notification">Ada sent you a friend request</span></div>
        </ul>
      </div>
      <br />

      <div>
        <h4>Musicals:</h4>
        <span id="musical-name">Hamilton</span>
      </div>
      <div className="input-group mb-3">
        <label className="input-group-text" for="count">How many stars is this musical?</label>
        <input className="form-control" type="text" id="count" value="--" readonly />
      </div>
      <br />
      <div>
        <Button variant='primary' onClick={() => {}}>
                        Submit Rating
                        </Button>
      </div>
      <br />
        </div>
      </div>
      
    </main>
  );
}