import React, { useState } from 'react';
import DeptService from '../service/DepartmentService';
import { useNavigate } from 'react-router-dom';

function RegisterDept() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        deptName: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the register method from UsersService
            const token = localStorage.getItem('token');
            await DeptService.registerDept(formData, token);

            // Clear the form fields after successful registration
            setFormData({
                deptName: ''
            });
            alert('Department registered successfully');
            navigate('/admin/dept-management');

        } catch (error) {
            console.error('Error registering dept:', error);
            alert('An error occurred while registering dept');
        }
    };

    return (
        <div className="auth-container">
            <h2>Department Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="deptName"  // Use the correct name that matches the formData key
                        value={formData.deptName}
                        onChange={handleInputChange}  // Use the handler function
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterDept;
