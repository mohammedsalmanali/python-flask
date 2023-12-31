import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Route as ReactRoute } from 'react-router-dom'; // Import Routes and Route as ReactRoute

import ApiComponent from './ApiComponent';
import DisplayActivities from './DisplayActivities';

import './App.css';

function Home() {
    return (
        <div>
        <h1>Health Tracking App</h1>
        <button>
            <Link to="/record">Record Health Data</Link>
        </button>
    </div>
    );
}

function App() {
    const [healthData, setHealthData] = useState({});

    const recordHealthData = async () => {
        // Simulate health data
        const data = {
            date: new Date().toISOString(),
            exercise: 'Running',
            calories: 300,
        };

        const response = await fetch('http://localhost:5000/api/health', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);
            setHealthData(data);
        }
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <ReactRoute path="/" element={<Home />} />
                    <ReactRoute path="/record" element={<ApiComponent />} />
                    <ReactRoute path="/activities/:userId" element={<DisplayActivities />} />
                </Routes>
                <button onClick={recordHealthData}>Record Health Data</button>
                {healthData.date && (
                    <div>
                        <h2>Recorded Health Data:</h2>
                        <p>Date: {healthData.date}</p>
                        <p>Exercise: {healthData.exercise}</p>
                        <p>Calories: {healthData.calories}</p>
                    </div>
                )}
            </div>
        </Router>
    );
}

export default App;
