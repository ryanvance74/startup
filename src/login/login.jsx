import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
import { AuthState} from './app.jsx'
function Authenticated({ userName, onLogout}) {
    return (
        <div className="input-group mb-3">
            <p>{`Logged in as ${userName}`}</p>
            <Button variant="outline-danger" onClick={() => onLogout()}>Logout</Button>
        </div>
    )
}

function Unauthenticated({ userName, onLogin }) {
    const processLogin = (userName, password) => {
        const userPassword = localStorage.getItem(userName)
        if (userPassword) {
            if (password === userPassword) {
                onLogin(userName)
            }
        }
    }

    const processCreate = (userName, password) => {
        localStorage.setItem(userName, password)
        onLogin(userName)
    }
    
    const [inputUserName, setInputUserName] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    return (
        <form onSubmit={(e) => e.preventDefault()}>
                <div className="input-group mb-3">
                <span className="input-group-text">@</span>
                <input className="form-control" type="text" placeholder="your_username" onChange={(e) => setInputUserName(e.target.value)}/>
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text">🔒</span>
                <input className="form-control" type="password" placeholder="password" onChange={(e) => setInputPassword(e.target.value)}/>
                </div>
                <Button variant='primary' onClick={() => processLogin(inputUserName, inputPassword)}>
                Login
                </Button>
                <Button variant='primary' onClick={() => processCreate(inputUserName, inputPassword)}>
                Create
                </Button>
        </form>
    )

}
export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className="background container-fluid flex-grow-1 d-flex flex-column align-items-center">
        <div>
            {authState !== AuthState.Unknown && 
            <h1>Welcome to MusicalRankings, the site where you can rank musicals!</h1>}
            {authState === AuthState.Authenticated && <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />}
            {authState === AuthState.Unauthenticated && (
            <Unauthenticated
                userName={userName}
                onLogin={(loginUserName) => {
                onAuthChange(loginUserName, AuthState.Authenticated);
                }}
            />
            )}
        </div>
      
    </main>
    
  );
}