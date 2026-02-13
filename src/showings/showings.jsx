import React from 'react';
import './showings.css'
export function Showings() {
  return (
    <main className="container-fluid flex-grow-1 d-flex flex-column justify-content-between">
        <div className="row">
            <div className="col-md-6">
                <h4 className="text-center"> Latest on musicals at the West End </h4>
                <table className="table table-success table-striped-columns">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Showings Today</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td> Les Mis</td>
                        <td>1</td>
                        <td>$120</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Hamilton</td>
                        <td>3</td>
                        <td>$400</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Wicked</td>
                        <td>2</td>
                        <td>$210</td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <Button variant='primary' onClick={() => {}}>
                        Refresh Listings
                        </Button>
                    </div>
            </div>
        </div>
        
    </main>
  );
}