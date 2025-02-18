import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { ApiProvider } from "../contexts/ApiContext";
import Admin from "../pages/Admin/Admin.jsx";
import UploadTemplate from "../pages/UploadTemplate/UploadTemplate.jsx";
import SignAgreement from "../pages/SignAgreement/SignAgreement.jsx";
import Clients from "../pages/Clients/Clients.jsx";
import Login from "../pages/Login/Login.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import ThankYou from "../pages/ThankYou/ThankYou.jsx";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <ApiProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/upload-template" element={<UploadTemplate />} />
          <Route path="/sign-agreement" element={<SignAgreement />} />
          <Route path="/thank-you" element={<ThankYou/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ApiProvider>
    </AuthProvider>
  );
}
