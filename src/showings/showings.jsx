import React from 'react';
import {useState, useEffect} from 'react';
import './showings.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const API_KEY = BMdcxMfnXQJYhVAo8nxMnNNb0G1ZOrlv;
export function Showings() {
    const [musicals, setMusicals] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState(false);
    const mockAPIData = [
        {id: 1, name: 'Les Mis', showings_today: 1, price: 140},
        {id: 2, name: 'Hamilton', showings_today: 2, price: 250},
        {id: 3, name: 'Wicked', showings_today: 4, price: 180},
        {id: 4, name: 'Phantom of the Opera', showings_today: 0, price: 'N/A'}
    ]
    const fetchRequest = async () => {
        setLoadingMessage(true);
        const url = new URL(`https://app.ticketmaster.com/discovery/v2/events.json`)
        url.searchParams.set('classificationName', 'theatre');
        url.searchParams.set('city', 'New York');
        url.searchParams.set('stateCode', 'NY');
        url.searchParams.set('apikey', API_KEY);
        
        const res = await fetch(url.toString());
        const body = await res.json();
        
        setTimeout(() => {
            const idx = Math.floor(Math.random() * 3)
            const new_val = Math.floor(Math.random() * 450 + 70)
            const showings_val = Math.floor(Math.random() * 3 + 1)
            const updatedData = [...mockAPIData]
            updatedData[idx].price = new_val
            updatedData[idx].showings_today = showings_val
            setMusicals(mockAPIData)
            setLoadingMessage(false)
        }, 3000)
    }
    useEffect(() => {
        fetchRequest();
    }, [])
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
                    {musicals.map((musical, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td> 
                            <td>{musical.name}</td>
                            <td>{musical.showings_today}</td>
                            <td>{musical.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                    <Button variant='primary' onClick={fetchRequest}>
                        Refresh Listings
                        </Button>
                    </div>
                {loadingMessage && <div>
                    Loading latest showings from the West End!
                </div>
                    }  
            </div>
        </div>
        
    </main>
  );
}