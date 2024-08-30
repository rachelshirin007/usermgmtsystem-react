// components/UserManagementPage.js
import React, { useState, useEffect } from 'react';
import DepartmentService from '../service/DepartmentService';
import { Link } from 'react-router-dom';

function DepartMgtPage() {
  const [depts, setDepts] = useState([]);

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchDepts();
  }, []);

  const fetchDepts = async () => {
    try {

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await DepartmentService.getAllDepts(token);
      console.log(response.departmentList)
      setDepts(response.departmentList); 
      console.log("depts " + depts)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  const deleteDept = async (deptId) => {
    try {
      // Prompt for confirmation before deleting the user
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (confirmDelete) {
        await DepartmentService.deleteDept(deptId, token);
        // After deleting the dept, fetch the updated list of depts
        fetchDepts();
      }
    } catch (error) {
      console.error('Error deleting dept:', error);
    }
  };

  return (
    <div className="user-management-container">
      <h2>Departments Page</h2>
      <button className='reg-button'> <Link to="/registerdept">Add Dept</Link></button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {depts.map(dept => (
            <tr key={dept.departmentId}>
              <td>{dept.departmentId}</td>
              <td>{dept.deptName}</td>
              <td>
                <button className='delete-button' onClick={() => deleteDept(dept.departmentId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartMgtPage;