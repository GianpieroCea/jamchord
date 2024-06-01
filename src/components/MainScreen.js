import React, { useState, useEffect } from 'react';

function MainScreen({ onGenerate }) {
  const [progressions, setProgressions] = useState([]);
  const [filteredProgressions, setFilteredProgressions] = useState([]);
  const [filters, setFilters] = useState({
    maxChords: '',
    containsNonDiatonic: false,
    isMajor: null
  });

  useEffect(() => {
    fetch('/data/chordProgressions.json')
      .then(response => response.json())
      .then(data => {
        setProgressions(data);
        setFilteredProgressions(data);
      })
      .catch(error => console.error('Error fetching the data:', error));
  }, []);

  useEffect(() => {
    filterProgressions();
  }, [filters]);

  const handleGenerateClick = () => {
    if (filteredProgressions.length === 0) return;
    const randomProgression = filteredProgressions[Math.floor(Math.random() * filteredProgressions.length)];
    onGenerate(randomProgression);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const filterProgressions = () => {
    setFilteredProgressions(progressions.filter(progression => {
      const { maxChords, containsNonDiatonic, isMajor } = filters;
      const matchesMaxChords = maxChords ? progression.numChords <= parseInt(maxChords) : true;
      const matchesNonDiatonic = containsNonDiatonic ? progression.containsNonDiatonic : true;
      const matchesMajor = isMajor !== null ? progression.isMajor === isMajor : true;
      return matchesMaxChords && matchesNonDiatonic && matchesMajor;
    }));
  };

  return (
    <div>
      <h1>Chord Progression Generator</h1>
      <div>
        <label>
          Max Chords:
          <input
            type="number"
            name="maxChords"
            value={filters.maxChords}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <div>
        <label>
          Contains Non-Diatonic:
          <input
            type="checkbox"
            name="containsNonDiatonic"
            checked={filters.containsNonDiatonic}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <div>
        <label>
          Major:
          <input
            type="radio"
            name="isMajor"
            value={true}
            checked={filters.isMajor === true}
            onChange={() => setFilters({ ...filters, isMajor: true })}
          />
        </label>
        <label>
          Minor:
          <input
            type="radio"
            name="isMajor"
            value={false}
            checked={filters.isMajor === false}
            onChange={() => setFilters({ ...filters, isMajor: false })}
          />
        </label>
        <label>
          Any:
          <input
            type="radio"
            name="isMajor"
            value={null}
            checked={filters.isMajor === null}
            onChange={() => setFilters({ ...filters, isMajor: null })}
          />
        </label>
      </div>
      <button onClick={handleGenerateClick}>Generate Chord Progression</button>
    </div>
  );
}

export default MainScreen;
