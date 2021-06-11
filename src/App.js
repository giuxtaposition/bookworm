import React from "react";
import "./App.css";
import AddNewBook from "./components/AddNewBook";
import Filter from "./components/Filter";
import Header from "./components/Header";
import Library from "./components/Library";

function App() {
  return (
    <div className="App">
      <Header />
      <Filter />
      <Library />
      <AddNewBook />
    </div>
  );
}

export default App;
