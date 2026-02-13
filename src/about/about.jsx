import React from 'react';
import './about.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export function About() {
  return (
    <main className="container-fluid flex-grow-1 d-flex flex-column justify-content-between">
        <div className="row"> 
            <div className="col-md-6">
                <h4>Welcome to the theatre!</h4>
                    <div id="picture" className="picture-box"><img width="400px" src={`${import.meta.env.BASE_URL}assets/theatre.png`} /></div>

                    <p>
                        MusicalRankings is a site where you can rank and rate your favorite musicals! Rank your top five musicals, 
                        add your friends, and compare your rankings to your friends'.
                    </p>

                    <p>
                        Note: movie musicals and broadway musicals are not distinguished here. Rate them together!
                    </p>
            </div>
        </div>
        
    </main>
  );
}
