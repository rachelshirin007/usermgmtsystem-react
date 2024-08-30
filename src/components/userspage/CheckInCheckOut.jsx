import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckInCheckOut = ({ userId }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false); // Tracks whether the user is currently checked in
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    // Fetch the user's last check-in status from the server when the component loads
    checkLastCheckInStatus();
  }, []);

  const checkLastCheckInStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/checkin/user/status/${userId}`);
      if (response.data.checkedIn) {
        setIsCheckedIn(true); // If user is checked in, set the checkbox to checked
      } else {
        setIsCheckedIn(false); // If user is not checked in, set the checkbox to unchecked
      }
    } catch (error) {
      console.error('Error fetching check-in status:', error);
    }
  };

  const handleCheckboxChange = async (e) => {
    const checked = e.target.checked;
    setIsCheckedIn(checked);

    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
      if (checked) {
        // User is checking in
        const response = await axios.post(`http://localhost:8080/adminuser/checkin/user/checkin/${userId}`, {}, config);
        //console.log(response); // Log to see full response
        setStatusMessage(response.data.message || 'Check-in successful');      } else {
        // User is checking out
        const response = await axios.post(`http://localhost:8080/adminuser/checkin/user/checkout/${userId}`, {}, config);
        //console.log(response); // Log to see full response
        setStatusMessage(response.data.message || 'Check-out successful');      }
    } catch (error) {
      console.error('Error during check-in/check-out:', error);
      setStatusMessage('Failed to check-in/check-out.');
    }
  };

  return (
    <div>
      <h3>User Check-In/Check-Out</h3>
      <label>
        <input
          type="checkbox"
          checked={isCheckedIn}
          onChange={handleCheckboxChange}
        />
        {isCheckedIn ? 'Checked In' : 'Checked Out'}
      </label>

      {/* Display the status message */}
      <p>{statusMessage}</p>
    </div>
  );
};

export default CheckInCheckOut;
