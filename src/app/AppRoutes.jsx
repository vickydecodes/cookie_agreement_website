import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { ApiProvider } from "../contexts/ApiContext";
import Register from "../pages/Register/Register.jsx";
import Admin from "../pages/Admin/Admin.jsx";
import UploadTemplate from "../pages/UploadTemplate/UploadTemplate.jsx";
import SignAgreement from "../pages/Home/SignAgreement.jsx";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <ApiProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Admin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/upload-template" element={<UploadTemplate />} />
          <Route path="/sign-agreement/:uid" element={<SignAgreement />} />
        </Routes>
      </ApiProvider>
    </AuthProvider>
  );
}
