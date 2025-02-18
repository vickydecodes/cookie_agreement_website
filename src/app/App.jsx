import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css"; // Import the styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import AppRoutes from "./AppRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
