import React from 'react';
import './friends.css'
import Button from 'react-bootstrap/Button';

export function Friends() {
  return (
    <main className="container-fluid flex-grow-1 d-flex flex-column justify-content-between">
        <div className="row">
            <div className="col-md-6">
                <h4>Send a Friend Request:</h4>
                    <div className="input-group mb-6">
                    <span className="input-group-text">@</span>
                    <input className="form-control" type="text" placeholder="your@email.com" />
                    </div>
                    <div>
                        <Button variant='primary' onClick={() => {}}>
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
                    <tr>
                        <td>1</td>
                        <td> Tim</td>
                        <td>10</td>
                        <td>May 20, 2021</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Ada</td>
                        <td>29</td>
                        <td>June 2, 2021</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Gunter Spears</td>
                        <td>7</td>
                        <td>July 3, 2020</td>
                    </tr>
                    </tbody>
                </table>
            </div>
                
        </div>
        
    </main>
  );
}