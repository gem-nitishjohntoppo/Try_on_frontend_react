
import React, { useState } from 'react';
import Jewelry from './components/Jewelry.js'
import WebcamComponent from './components/WebcamComponent.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [selectedJewelry, setSelectedJewelry] = useState({
    necklace: null,
    ring: null,
    earring: null,
    bracelet: null,
  });

  const handleSelectJewelry = (jewelry) => {
    setSelectedJewelry((prev) => ({
      ...prev,
      [jewelry.type]: jewelry.id,
    }));
  };

  return (
    <div className="container">
      <header className="my-4">
        <h1>Virtual Jewelry Try-On</h1>
      </header>
      <Jewelry onSelectJewelry={handleSelectJewelry} />
      <WebcamComponent selectedJewelry={selectedJewelry} />
    </div>
  );
};

export default App;
