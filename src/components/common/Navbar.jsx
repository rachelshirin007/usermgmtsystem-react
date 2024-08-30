import React from 'react';
import { Link } from 'react-router-dom';
import UsersService from '../service/UsersService';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const isAuthenticated = UsersService.isAuthenticated();
    const isAdmin = UsersService.isAdmin();



    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout this user?');
        if(confirmLogout){
            UsersService.logout();
            setTimeout(()=>{
                navigate('/login')
            }, 500);
        }
    };


    return (
        <nav>
            <ul>
                {!isAuthenticated && <li><Link to="/">Ashville</Link></li>}
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
                {isAdmin && <li><Link to="/admin/dept-management">Dept Management</Link></li>}
                {isAdmin && <li><Link to="/admin/checkin-management">Checkins Management</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;