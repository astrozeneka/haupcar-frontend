import logo from './logo.svg';
import './App.css';
import React from "react";
import LoginComponent from "./components/LoginComponent";
import CarCollection from "./components/CarCollection";
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
                <Route path="/" element={<CarCollection />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/cars" element={<CarCollection />} />
            </Routes>
        </div>
      </Router>
  );
}

export default App;
