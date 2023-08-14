// DisplayActivities.js
import React, { useState, useEffect } from 'react';
import { getActivities } from './api';

function DisplayActivities({ userId }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchUserActivities = async () => {
        const response = await fetch(`http://localhost:5000/user/activities/${userId}`);
        if (response.ok) {
          const activities = await response.json();
          setActivities(activities); // Set activities to the state
        }
      };
  
      fetchUserActivities();
  }, [userId]);

  return (
    <div>
      <h2>Your Activities</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            <strong>{activity.name}</strong> on {activity.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayActivities;
