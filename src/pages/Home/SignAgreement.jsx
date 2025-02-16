import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import trimCanvas from "trim-canvas"; // ✅ Import trimCanvas
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Lottie from "lottie-react";
import agreement_animation from '../../assets/animations/agreement_animation.json'
import './SignAgreement.css'
import Navbar from "../components/Navbar/Navbar";
import cookie_loader from '../../assets/animations/cookie_loader.json'

export default function SignAgreement() {
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const { uid } = useParams();

  useEffect(() => {
    if (!uid) {
      toast.error("You are not authorized to access this page");
      navigate("/register");
    }
  });

  const sigCanvas = useRef(null); // ✅ Initialize with null
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveSignature = () => {
    if (sigCanvas.current) {
      const trimmedCanvas = trimCanvas(sigCanvas.current.getCanvas()); // ✅ Trim canvas
      return trimmedCanvas.toDataURL("image/png"); // ✅ Get Base64
    }
    return null;
  };

  const clearSignature = () => {
    if (sigCanvas.current) sigCanvas.current.clear();
  };

  const handleSubmit = async () => {
    const signature = saveSignature();

    const requestData = {
      name: formData.name,
      date: formData.date,
      address: formData.address,
      signature: signature,
      uid: uid,
    };
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/generate-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      if (result) {
        console.log(result);
        setFormData({name: '', date: '', address: ''})
      } else {
        alert("Error generating PDF");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="100vh" style={{height: 'calc(100vh - 120px)'}} >
      <Navbar/>
      <div className="row g-0 h-100">
        {loading ? (
          <div className="col-12 d-flex justify-content-center align-items-center">
            <Lottie
            animationData={cookie_loader}
            loop={true}
            style={{ width: "80%", height: "500px" }}
          />{" "}
          </div>        ): (
          <>
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
      <div className="text-start  w-75">
      

      <div className="mb-3 mt-5">
        <label className="form-label"><h4>Name</h4></label>
        <input
          type="text"
          className="form-control input_field"
          name="name"
          placeholder="Enter Your Name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label"><h4>Phone</h4></label>
        <textarea
          className="form-control input_field"
          name="address"
          value={formData.address}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="w-100">
        <h4>Your Signature</h4>
        <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{
          width: 600,
          height: 200,
          className: " canva",
        }}
      />
      </div>
      <div className="d-flex mt-2 gap-3">
        <button onClick={clearSignature} className="clear">
          Clear
        </button>
      

      <button onClick={handleSubmit} className="submit">
        Submit Agreement
      </button>
      <button onClick={() => navigate('/admin')}>Admin page</button>
      </div>

      </div>
        </div>
        <div className="col-md-6  d-flex justify-content-center align-items-center">
          <Lottie
            animationData={agreement_animation}
            loop={true}
            style={{ width: "100%", height: "auto" }}
          />{" "}
        </div></>

        )}
      </div>
      
    </div>
  );
}
