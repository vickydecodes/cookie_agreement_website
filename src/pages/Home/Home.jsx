import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import trimCanvas from "trim-canvas"; // ✅ Import trimCanvas
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { currentUser } = useAuth();

  const navigate = useNavigate();
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
      uid: currentUser.uid,
    };
    setLoading(true);
    try {
      const response = await fetch("https://cookie-backend-ty95.onrender.com/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      if (result) {
        alert("PDF generated successfully");
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
    <div className="container mt-5">
      {loading && (
        <div className="text-center">
          {" "}
          <div className="spinner-border text-primary" role="status">
            {" "}
            <span className="visually-hidden">Loading...</span>{" "}
          </div>{" "}
        </div>
      )}
      <h2 className="text-center">Sign Agreement</h2>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Address</label>
        <textarea
          className="form-control"
          name="address"
          value={formData.address}
          onChange={handleChange}
        ></textarea>
      </div>

      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{
          width: 400,
          height: 150,
          className: "border border-dark",
        }}
      />
      <div className="d-flex mt-2">
        <button onClick={clearSignature} className="btn btn-danger">
          Clear
        </button>
      </div>

      <button onClick={handleSubmit} className="btn btn-primary mt-3">
        Submit Data
      </button>



      <button onClick={() => navigate('/register')}>Navigate to register</button>
    </div>
  );
}
