import React from 'react';
import {Routes, Route} from 'react-router-dom'
import ForgotPassword from './ForgotPassword';
import Login from './Login'
import Register from './Register';

const index = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}

export default index;
