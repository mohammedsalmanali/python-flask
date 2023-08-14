import React, { useState } from 'react';
import './App.css';

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
        <div className="App">
            <h1>Health Tracking App</h1>
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
    );
}

export default App;
