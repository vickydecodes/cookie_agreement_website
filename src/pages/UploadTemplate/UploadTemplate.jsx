import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UploadTemplate.css";
import Lottie from "lottie-react";
import admin_animation from "../../assets/animations/admin_animation.json";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";

export default function UploadTemplate() {
  const [file, setFile] = useState(null);

  const {isAdmin} = useApi();

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/upload-template",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(res.data.message);
    } catch (error) {
      alert("Upload failed.");
      console.error(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      toast.alert("We tracked you. Dont try to log in .");
      return navigate("/login");
    }
  });

  return (
    <div className="100vh" style={{ height: "calc(100vh - 120px)" }}>
      <Navbar is_client={false} />
      <div className="row g-0">
        <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
          <div className="d-flex w-75 flex-column">
            <h2>Update Agreement Template</h2>

            <input
              className="input_field"
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="upload_btn" onClick={handleUpload}>
              Upload New Template
            </button>
          </div>
        </div>
        <div className="col-md-6  d-flex justify-content-center align-items-center">
          <Lottie
            animationData={admin_animation}
            loop={true}
            style={{ width: "100%", height: "auto" }}
          />{" "}
        </div>
      </div>
    </div>
  );
}
