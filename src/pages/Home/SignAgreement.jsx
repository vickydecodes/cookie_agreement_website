import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import trimCanvas from "trim-canvas"; // ✅ Import trimCanvas
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Lottie from "lottie-react";
import agreement_animation from "../../assets/animations/agreement_animation.json";
import "./SignAgreement.css";
import Navbar from "../components/Navbar/Navbar";
import cookie_loader from "../../assets/animations/cookie_loader.json";
import { toast } from "react-toastify";

export default function SignAgreement() {
  const { currentUser } = useAuth();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 950);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    phone_number: "",
    date: "",
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
      phone_number: formData.phone_number,
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
        toast.success(result.message)
        setFormData({ name: "", phone_number: "", date: "" });
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
    <div className="100vh" style={{ height: "calc(100vh - 120px)" }}>
      <Navbar is_client={true} />
      <div className="row g-0 h-100">
        {loading ? (
          <div className="col-12 d-flex justify-content-center align-items-center">
            <Lottie
              animationData={cookie_loader}
              loop={true}
              style={{ width: "80%", height: "500px" }}
            />{" "}
          </div>
        ) : (
          <>
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
             <div className="w-75">
             <div className="mb-3 mt-5">
                <label className="form-label">
                  <h4>Name</h4>
                </label>
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
                <label className="form-label">
                  <h4>Phone</h4>
                </label>
                <input
                  className="form-control input_field"
                  name="phone_number"
                  placeholder="Enter Your Phone Number"
                  value={formData.phone_number}
                  onChange={handleChange}
                ></input>
              </div>

              <div className="">
                <h4>Your Signature</h4>
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor="black"
                  canvasProps={{
                    width: isMobile ? 300 : 650,
                    height:  isMobile ? 200 : 150,
                    className: "canva",
                  }}
                />
              </div>
              <div className="row g-2 p-0 m-0 d-flex  justify-content-center align-items-center mt-4 ">
                <div className="col-md-6">
                  <button onClick={clearSignature} className="clear">
                    Clear
                  </button>
                </div>
                <div className="col-md-6">
                  <button onClick={handleSubmit} className="submit">
                    Submit Agreement
                  </button>
                </div>
              </div>
             </div>
            </div>
            <div className="col-md-6  d-flex justify-content-center align-items-center">
              <Lottie
                animationData={agreement_animation}
                loop={true}
                style={{ width: "100%", height: "auto" }}
              />{" "}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
