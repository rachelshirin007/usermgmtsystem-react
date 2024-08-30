import React, { useState, useEffect } from 'react';
import UsersService from '../service/UsersService';
import { Link } from 'react-router-dom';
import CheckInCheckOut from './CheckInCheckOut';


function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({
        name: '',
        email: '',
        city: ''
    });

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UsersService.getYourProfile(token);
            setProfileInfo(response.users);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <div className="profile-page-container">
            <h2>Profile Information</h2>
            <p>Name: {profileInfo.name}</p>
            <p>Email: {profileInfo.email}</p>
            <p>City: {profileInfo.city}</p>
            {profileInfo.role === "ADMIN" && (
                <button><Link to={`/update-user/${profileInfo.userId}`}>Update This Profile</Link></button>
            )}

            {profileInfo.userId && (
            <div>
                <br />
                <br />
                <br />
                <h2>Check-In</h2>
                <CheckInCheckOut userId={profileInfo.userId} />
            </div>
        )}
        </div>
    );
}

export default ProfilePage;