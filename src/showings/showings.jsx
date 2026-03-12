import React from 'react';
import {useState, useEffect} from 'react';
import './showings.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const API_KEY = BMdcxMfnXQJYhVAo8nxMnNNb0G1ZOrlv;
export function Showings() {
    const [musicals, setMusicals] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState(false);
    
    const fetchRequest = async () => {
        setLoadingMessage(true);
        const url = new URL(`https://app.ticketmaster.com/discovery/v2/events.json`)
        url.searchParams.set('classificationName', 'theatre');
        url.searchParams.set('city', 'New York');
        url.searchParams.set('stateCode', 'NY');
        url.searchParams.set('apikey', API_KEY);
        try {
            const res = await fetch(url.toString());
            const body = await res.json();
            const events = body._embedded?.events || []
            const processed = events.map((event) => ({
                name: event.name,
                location: event._embedded.venues[0].name,
                date: event.dates.start.dateTime
            }))
            setMusicals(processed)
        } catch (err) {
            console.error("Failed to fetch TicketMaster API: ", err);
        } finally {
            setLoadingMessage(false);
        }
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