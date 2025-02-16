import React, { useState } from "react";
import './Admin.css'
import Lottie from "lottie-react";
import { postRequest } from "../../utils/ApiService";
import Navbar from "../components/Navbar/Navbar";
import admin_animation from "../../assets/animations/admin_animation.json";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const handleCreateUser = async () => {
    try {
      const response = await postRequest("http://localhost:5000/create-user", {
        email,
        client_name: clientName
      });

      const data = response;
      if (data) {
        setGeneratedLink(data.link);
      } else {
        alert("Failed to create user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating user");
    }
  };

  return (
    <div className="">
      <Navbar is_client={false}/>
      <div className="row g-0">
        <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
          <div className="mb-4 w-75">
            <h3>Create User</h3>
            <input
              type="email"
              className="form-control mt-5 input_field"
              placeholder="Enter Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <input
              type="email"
              className="form-control my-5 input_field"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="create_btn" onClick={handleCreateUser}>
              Create User
            </button>
          </div>
          <div className="mt-3 w-75">
            <h3>Generated Link</h3>
            {generatedLink && (
              <div>
                <input
                  type="text"
                  className="form-control input_field my-3"
                  value={generatedLink}
                  readOnly
                />
                <button
                  className="copy_btn mt-2"
                  onClick={() => navigator.clipboard.writeText(generatedLink)}
                >
                  Copy Link
                </button>
              </div>
            )}
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
