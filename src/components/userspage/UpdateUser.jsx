import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UsersService from '../service/UsersService';

function UpdateUser() {
  const navigate = useNavigate();
  const { userId } = useParams();


  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    city: '',
    mobile: '',
    password: '',
    department: ''
  });

  useEffect(() => {
    fetchUserDataById(userId); // Pass the userId to fetchUserDataById
  }, [userId]); //wheen ever there is a chane in userId, run this

  const fetchUserDataById = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UsersService.getUserById(userId, token); // Pass userId to getUserById
      //const { name, email, role, city, mobile, password, deptId } = response.users;
      setUserData( response.users );
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm('Are you sure you want to update this user?');
      if (confirmUpdate) {
        const token = localStorage.getItem('token');
        const res = await UsersService.updateUser(userId, userData, token);
        console.log(res)
        // Redirect to profile page or display a success message
        navigate("/admin/user-management")
      }

    } catch (error) {
      console.error('Error updating user profile:', error);
      alert(error)
    }
  };

  return (
    <div className="auth-container">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input type="text" name="role" value={userData.role} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input type="text" name="city" value={userData.city} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input type="text" name="mobile" value={userData.mobile} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Department ID:</label>
          <input type="number" name="deptId" value={userData.department.departmentId} onChange={handleInputChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;