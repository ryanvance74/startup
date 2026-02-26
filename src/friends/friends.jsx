import React from 'react';
import {useState, useEffect} from 'react';
import './friends.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Friends() {
    const [input, setInput] = useState('');
    const [pendingRequests, setPendingRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('saved_friends')
        if (saved) setFriends(JSON.parse(saved));
    }, [])

    const sendRequest = () => {
        if (!input.trim()) return;
        tempName = input;
        setInput('');
        setPendingRequests((prev) => [...prev, tempName]);
        setTimeout(() =>  {
            setPendingRequests((prev) => prev.filter((name) => name !== tempName));
            setFriends((prevFriends) => {
                const newFriends = [...prevFriends, tempName];
                localStorage.setItem('saved_friends', JSON.stringify(newFriends));
                return newFriends;
            }, 3000)
        })
    }
  return (
    <main className="container-fluid flex-grow-1 d-flex flex-column justify-content-between">
        <div className="row">
            <div className="col-md-6">
                <h4>Send a Friend Request:</h4>
                    <div className="input-group mb-6">
                    <span className="input-group-text">@</span>
                    <input className="form-control" type="text" placeholder="your@email.com" 
                            value={inputValue}
                            onChange={(e) => setInput(e.target.value)}
                    />
                    </div>
                    <div>
                        <Button variant='primary' onClick={sendRequest}>
                        Send Friend Request
                        </Button>
                    </div>
            </div>
            <div className="col-md-6">
                <h4 className="text-center" id="table-title"> Friends </h4>
                <table className="table table-success table-striped-columns">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Musicals Rated</th>
                        <th>Friends Since</th>
                    </tr>
                    </thead>

                    <tbody>
                    {friends.map((name, i) => (
                        <tr key={i}> 
                            <td>{name}</td>
                            <td>{Math.floor(Math.random()*30)}</td>
                            <td>{new Date().toLocaleDateString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="col-md-6">
                <h4 className="text-center" id="table-title"> Pending Requests </h4>
                <table className="table table-success table-striped-columns">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pendingRequests.map((name, i) => (
                        <tr key={i}> 
                            <td>{name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
                
        </div>
        
    </main>
  );
}