// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanetCard from './PlanetCard';
import Loader from './Loader';
import img from './BackGround.webp';

function App() {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false); // New state for tracking fetch errors

  useEffect(() => {
    // Fetch planets data from SWAPI
    axios.get('https://swapi.dev/api/planets/?format=json')
      .then(response => {
        setPlanets(response.data.results);
        setNextPage(response.data.next);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching planets:', error);
        setFetchError(true); // Set fetchError to true if there's an error
        setLoading(false);
      });
  }, []);

  const loadMorePlanets = () => {
    if (nextPage) {
      axios.get(nextPage)
        .then(response => {
          setPlanets(prevPlanets => [...prevPlanets, ...response.data.results]);
          setNextPage(response.data.next);
        })
        .catch(error => {
          console.error('Error fetching more planets:', error);
          setFetchError(true); // Set fetchError to true if there's an error during loadMore
        });
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className='Wrapping'>
        <img src={img} alt="Background"/>
        <div className="App">
          <h1 className='Wars'>Star Wars Planets Directory</h1>
          {fetchError && (
            <div className="error-message">
              Please refresh the page. There was an error in the CORS.
            </div>
          )}
          {!fetchError && (
            <div className="planets-container">
              {planets.map(planet => (
                <PlanetCard key={planet.name} planet={planet} />
              ))}
            </div>
          )}
          {nextPage && (
            <button className="load-more-btn" onClick={loadMorePlanets}>
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
