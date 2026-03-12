import React from 'react';
import {useState, useEffect} from 'react';
import './friends.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Friends() {
    const [input, setInput] = useState('');
    const [friends, setFriends] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        fetch('/api/friends')
            .then(res => res.json())
            .then(body  => {
                setFriends(body.friends)
            })
            .catch(() => setStatusMessage('Failed to load friends.'))
    }, [])

    const sendRequest = async () => {
        if (!input.trim()) return;
        if (friends.some((friend) => friend.name === input)) {
            setStatusMessage('You are already friends with this person.');
            setTimeout(() => {
                setStatusMessage('');
            }, 3000)
            return
        }
        setStatusMessage('Sending request...')
        const res = await fetch('/api/make-friend', {
            method: 'post', 
            body: JSON.stringify({friendName: input}),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        const body = await res.json()
        if (res.status === 200) {
            setFriends(body.friends)
            setStatusMessage('Successfully followed friend!')
            setTimeout(() => {
                setStatusMessage('');
            }, 3000)
        } else {
            setStatusMessage(`Error while attempting to follow friend: ${body.message}`)
            setTimeout(() => {
                setStatusMessage('');
            }, 3000)
        }
        setInput('');
    }

    const resetFriends = async () => {
        const res = await fetch('/api/friends', {method: 'delete'})
        const body = await res.json()
        if (res.status === 200) {
            setStatusMessage('Reset friends list.')
            setFriends([])
        } else {
            setStatusMessage(`Failed to reset friends: ${body.message}`)
        }

    }
  return (
    <main className="container-fluid flex-grow-1 d-flex flex-column justify-content-between">
        <div className="row">
            <div className="col-md-6">
                <h4>Enter a User to Follow:</h4>
                    <div className="input-group mb-6">
                    <span className="input-group-text">@</span>
                    <input className="form-control" type="text" placeholder="john123" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                    />
                    </div>
                    <div>
                        <Button variant='primary' onClick={sendRequest}>
                        Send Friend Request
                        </Button>
                    </div>
                    <div>
                        <Button variant='primary' onClick={resetFriends}>
                        Reset Friends
                        </Button>
                    </div>
            </div>
            <div className="col-md-6">
                <h4 className="text-center" id="table-title"> People That You Follow </h4>
                <table className="table table-success table-striped-columns">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Musicals Rated</th>
                        <th>Followed Since</th>
                    </tr>
                    </thead>

                    <tbody>
                    {friends.map((friend, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td> 
                            <td>{friend.name}</td>
                            <td>{friend.musicalsRated}</td>
                            <td>{friend.since}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {statusMessage && <div className="alert">
                {statusMessage}
                </div>}
        </div>
        
    </main>
  );
}