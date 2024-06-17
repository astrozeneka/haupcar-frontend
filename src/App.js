import logo from './logo.svg';
import './App.css';
import React from "react";
import LoginComponent from "./components/LoginComponent";
import CarCollectionComponent from "./components/CarCollectionComponent";
import CarInsertComponent from "./components/CarInsertComponent";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

function App() {
  return (
      <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<CarCollectionComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/cars" element={<CarCollectionComponent />} />

                <Route path="/cars/new" element={<CarInsertComponent />} />
            </Routes>
        </div>
      </Router>
  );
}

export default App;
