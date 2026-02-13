import React from 'react';
import Button from 'react-bootstrap/Button';

export function Login() {
  return (
    <main className="container-fluid flex-grow-1 d-flex flex-column align-items-center">
      <h1>Welcome to MusicalRankings, the site where you can rank musicals!</h1>
      <form method="get" action="rank.html">
        <div className="input-group mb-3">
          <span className="input-group-text">@</span>
          <input className="form-control" type="text" placeholder="your@email.com" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">🔒</span>
          <input className="form-control" type="password" placeholder="password" />
        </div>
        <Button variant='primary' onClick={() => {}}>
          Login
        </Button>
        <Button variant='primary' onClick={() => {}}>
          Create
        </Button>
      </form>
    </main>
  );
}