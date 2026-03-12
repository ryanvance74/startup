import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
import {AuthState} from '../auth_state.jsx'

function Authenticated({ userName, onLogout}) {
    return (
        <div className="flex-column">
            <h1 className='fs-5 user-status fw-bold'>{`Logged in as ${userName}`}</h1>
            <Button variant="danger" onClick={() => onLogout()}>Logout</Button>
        </div>
    )
}

function Unauthenticated({ userName, onLogin }) {
    const [inputUserName, setInputUserName] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [statusMessage, setStatusMessage] = useState('');


    async function loginUser() {
        loginOrCreate(`/api/auth/login`);
    }

    async function createUser() {
        loginOrCreate(`/api/auth/create`);
    }
    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ email: inputUserName, password: inputPassword }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        });
        if (response?.status === 200) {
            onLogin(inputUserName);
        } else {
            const body = await response.json();
            setStatusMessage(`⚠ Error: ${body.msg}`);
        }
    }

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="input-group mb-3">
                <span className="input-group-text">@</span>
                <input className="form-control" type="text" placeholder="your_username" onChange={(e) => setInputUserName(e.target.value)}/>
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text">🔒</span>
                <input className="form-control" type="password" placeholder="password" onChange={(e) => setInputPassword(e.target.value)}/>
                </div>
                <Button variant='primary' onClick={() => loginUser()}>
                Login
                </Button>
                <Button variant='primary' onClick={() => createUser()}>
                Create
                </Button>
            </form>
            {statusMessage && <div className="alert alert-danger">{statusMessage}</div>}
        </>
        
    )

}
export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className="background container-fluid flex-grow-1 d-flex flex-column align-items-center">
        <div>
            {authState !== AuthState.Unknown && 
            <h1>Welcome to MusicalRankings, the site where you can rank musicals!</h1>}
            {authState === AuthState.Authenticated && <Authenticated userName={userName} onLogout={() => onAuthChange('', AuthState.Unauthenticated)} />}
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