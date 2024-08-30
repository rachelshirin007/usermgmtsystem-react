// components/UserManagementPage.js
import React, { useState, useEffect } from 'react';
import CheckInService from '../service/CheckInService';

function CheckInMgmt() {
    const [checkIns, setCheckIns] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCheckIns();
    }, []);

    const fetchCheckIns = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
            const data = await CheckInService.getAllCheckIns(token);
            setCheckIns(data);
        } catch (error) {
            console.error('Error fetching check-ins:', error);
            setError('Failed to fetch check-ins.');
        }
    };

    return (
        <div>
            <h2>All Check-Ins</h2>
            {error && <p>{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Check-In Time</th>
                        <th>Check-Out Time</th>
                    </tr>
                </thead>
                <tbody>
                    {checkIns.length > 0 ? (
                        checkIns.map((checkIn) => (
                            <tr key={checkIn.id}>
                                <td>{checkIn.user.name}</td>
                                <td>{checkIn.checkinTime}</td>
                                <td>{checkIn.checkoutTime ? checkIn.checkoutTime : 'Not yet checked out'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No check-ins found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CheckInMgmt;