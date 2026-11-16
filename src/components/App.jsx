import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API_URL = "http://localhost:3001/toys";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  const handleClick = () => {
    setShowForm((showForm) => !showForm);
  };

  const handleAddToy = (newToy) => {
    setToys([...toys, newToy]);
  };

  const handleDeleteToy = (deletedToyId) => {
    setToys(toys.filter((toy) => toy.id !== deletedToyId));
  };

  const handleUpdateToy = (updatedToy) => {
    setToys(toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy)));
  };

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}
      />
    </>
  );
};

export default App;
