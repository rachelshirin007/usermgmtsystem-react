// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import FooterComponent from './components/common/Footer';
import UsersService from './components/service/UsersService';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';
import DepartmentMgtPage from './components/userspage/DepartmentMgtPage';
import CheckInManagement from './components/userspage/CheckInMgmt';
import RegisterDept from './components/auth/RegisterDept';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {UsersService.adminOnly() ? (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/admin/dept-management" element={<DepartmentMgtPage />} />
                <Route path="/admin/checkin-management" element={<CheckInManagement />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/registerdept" element={<RegisterDept />} />
              </>
            ) : <Route path="*" element={<Navigate to="/login" />} />}
            
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;