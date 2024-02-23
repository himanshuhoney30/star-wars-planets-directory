import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlanetCard = ({ planet }) => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    // Fetch residents data for each planet
    const fetchResidents = async () => {
      const residentsData = await Promise.all(
        planet.residents.map(residentURL => axios.get(residentURL))
      );
      setResidents(residentsData.map(res => res.data));
    };

    fetchResidents();
  }, [planet.residents]);

  return (
    <div className="planet-card background-section">
      <h2 className="Name">{planet.name}</h2><br/>
      <p className="Condition">Climate: {planet.climate}</p>
      <p className="Condition">Population: {planet.population}</p>
      <p className="Condition">Terrain: {planet.terrain}</p><br/>
      <h3 className="Condition">Notable Residents: ({residents.length})</h3>
      <div className="resident-table-container">
        {residents.length > 0 && (
          <table className="resident-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Height</th>
                <th>Mass</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {planet.residents.map((residentURL, index) => (
                <tr key={index} className="resident-item">
                  {residents[index] ? (
                    <>
                      <td>{residents[index].name}</td>
                      <td>{residents[index].height}</td>
                      <td>{residents[index].mass}</td>
                      <td>{residents[index].gender}</td>
                    </>
                  ) : (
                    <td colSpan="4">Data not available</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {residents.length === 0 && <p className='Data'>No residents data available</p>}
      </div>
    </div>
  );
};

export default PlanetCard;
