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
import { Navbar, Nav, Container } from 'react-bootstrap'
import {AuthState} from './auth_state.jsx'

export default function App() {
    const [authState, setAuthState] = useState(AuthState.Unknown);
    const [userName, setUserName] = useState('');
    useEffect(() => {
        setAuthState(AuthState.Unauthenticated)
    }, [])
    // useEffect(() => {
    //     if (possibleUser) {
    //         setUserName(possibleUser)
    //         setAuthState(AuthState.Authenticated)
    //     } else {
    //         setAuthState(AuthState.Unauthenticated)
    //     }
    // }, [])
  return (
    <BrowserRouter>
        <div className="body">
            <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand as={NavLink} to="/">MusicalRankings<sup>&reg;</sup></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            {authState === AuthState.Authenticated && (
                                <Nav.Link as={NavLink} to="/rank">Rank</Nav.Link>
                            )}
                            {authState === AuthState.Authenticated && (
                                <Nav.Link as={NavLink} to="/friends">Friends</Nav.Link>
                            )}
                            {authState === AuthState.Authenticated && (
                                <Nav.Link as={NavLink} to="/showings">Showings</Nav.Link>
                            )}
                            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>  
            </Navbar>

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