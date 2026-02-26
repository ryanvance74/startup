import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login.jsx';
import { Friends } from './friends/friends.jsx';
import { Rank } from './rank/rank.jsx';
import { Showings } from './showings/showings.jsx';
import { About } from './about/about.jsx';
import Button from 'react-bootstrap/Button';

export default function App() {
    const AuthState = {
        Unknown: 'unknown',
        Authenticated: 'authenticated',
        Unauthenticated: 'unauthenticated'
    }
    const [authState, setAuthState] = useState(AuthState.Unknown);
    const [userName, setUserName] = useState('');
    useEffect(() => {
        const possibleUser = localStorage.getItem('username')
        if (possibleUser) {
            setUserName(possibleUser)
            setAuthState(AuthState.Authenticated)
        } else {
            setAuthState(AuthState.Unauthenticated)
        }
    }, [])
  return (
    <BrowserRouter>
        <div className="body">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/">MusicalRankings<sup>&reg;</sup></NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                    <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                    {authState === AuthState.Authenticated && (
                        <li className="nav-item"><NavLink className="nav-link" to="/rank">Rank</NavLink></li>
                    )}
                    {authState === AuthState.Authenticated && (
                        <li className="nav-item"><NavLink className="nav-link" to="/friends">Friends</NavLink></li>
                    )}
                    {authState === AuthState.Authenticated && (
                        <li className="nav-item"><NavLink className="nav-link" to="/showings">Showings</NavLink></li>
                    )}
                    <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
                    </ul>
                </div>
            </nav>

            <Routes>
            <Route path='/' element={<Login 
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                    setAuthState(authState);
                    setUserName(userName);
                    localStorage.setItem('username', userName);
                }}
            />} 
            exact />
            <Route path='/friends' element={<Friends />} />
            <Route path='/rank' element={<Rank />} />
            <Route path='/showings' element={<Showings />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
            </Routes>
            

            <footer className="bg-dark text-light footer">
                <div className="container-fluid d-flex justify-content-between">
                    <span>Ryan Vance</span>
                    <NavLink to="https://github.com/ryanvance74/startup">GitHub</NavLink>
                </div>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}