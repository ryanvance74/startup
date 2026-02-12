import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login.jsx';
import { Friends } from './friends/friends.jsx';
import { Rank } from './rank/rank.jsx';
import { Showings } from './showings/showings.jsx';
import { About } from './about/about.jsx';

export default function App() {
  return (
    <BrowserRouter>
        <div className="body bg-dark text-light">
        <header className="container-fluid">
            <nav className="navbar fixed-top navbar-dark">
            <div className="navbar-brand">
                Simon<sup>&reg;</sup>
            </div>
            <menu className="navbar-nav">
                <li className="nav-item">
                <NavLink className="nav-link" to="">
                    Login
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="friends">
                    Friends
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="rank">
                    Rank
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="showings">
                    Showings
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="about">
                    About
                </NavLink>
                </li>
            </menu>
            </nav>
        </header>

        <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/friends' element={<Friends />} />
        <Route path='/rank' element={<Rank />} />
        <Route path='/showings' element={<Showings />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className="bg-dark text-white-50">
            <div className="container-fluid">
            <span className="text-reset">Author Name(s)</span>
            <a className="text-reset" href="https://github.com/webprogramming260/simon-react">
                Source
            </a>
            </div>
        </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}