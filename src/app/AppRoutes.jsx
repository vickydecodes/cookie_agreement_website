import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import { AuthProvider } from "../contexts/AuthContext";
import { ApiProvider } from "../contexts/ApiContext";
import  Register  from "../pages/Register/Register.jsx";
import  Login  from "../pages/Login/Login.jsx";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <ApiProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </ApiProvider>
    </AuthProvider>
  );
}
