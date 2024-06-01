import React, { useState } from 'react';
import MainScreen from './components/MainScreen';
import ProgressionScreen from './components/ProgressionScreen';
import './App.css';

function App() {
  const [showProgression, setShowProgression] = useState(false);
  const [selectedProgression, setSelectedProgression] = useState(null);

  const handleGenerateProgression = (progression) => {
    setSelectedProgression(progression);
    setShowProgression(true);
  };

  const handleBack = () => {
    setShowProgression(false);
    setSelectedProgression(null);
  };

  return (
    <div className="App">
      {showProgression ? (
        <ProgressionScreen progression={selectedProgression} onBack={handleBack} />
      ) : (
        <MainScreen onGenerate={handleGenerateProgression} />
      )}
    </div>
  );
}

export default App;
