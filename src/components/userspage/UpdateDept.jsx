import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DepartmentService from '../service/DepartmentService';

function UpdateDept() {
  const navigate = useNavigate();
  const { deptId } = useParams();


  const [deptData, setDeptData] = useState({
    deptName: ''
  });

  useEffect(() => {
    fetchDeptDataById(deptId); // Pass the userId to fetchUserDataById
  }, [deptId]); //wheen ever there is a chane in userId, run this

  const fetchDeptDataById = async (deptId) => {
    try {
        console.log("deptId" + deptId)
      const token = localStorage.getItem('token');
      const response = await DepartmentService.getDeptById(deptId, token); // Pass userId to getUserById
      //const { name, email, role, city, mobile, password, deptId } = response.users;
      console.log("response" + response.data)
      setDeptData( response );
      console.log("deptData" + deptData)
    } catch (error) {
      console.error('Error fetching dept data:', error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeptData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm('Are you sure you want to update this department?');
      if (confirmUpdate) {
        const token = localStorage.getItem('token');
        const res = await DepartmentService.updateDept(deptId, deptData, token);
        console.log(res)
        // Redirect to profile page or display a success message
        navigate("/admin/dept-management")
      }

    } catch (error) {
      console.error('Error updating department:', error);
      alert(error)
    }
  };

  return (
    <div className="auth-container">
      <h2>Update Department</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={deptData} onChange={handleInputChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateDept;