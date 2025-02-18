import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import trimCanvas from "trim-canvas"; // ✅ Import trimCanvas
import { useAuth } from "../../contexts/AuthContext";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Lottie from "lottie-react";
import agreement_animation from "../../assets/animations/agreement_animation.json";
import "./SignAgreement.css";
import Navbar from "../components/Navbar/Navbar";
import cookie_loader from "../../assets/animations/cookie_loader.json";
import { toast } from "react-toastify";
import { useApi } from "../../contexts/ApiContext";
import NotFound from "../NotFound/NotFound";

export default function SignAgreement() {
  const { sign_agreement, fetch_client, client } = useApi();

  const location = useLocation();

  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");

  console.log(uid);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!uid) {
      toast.error("You are not authorized to access this page");
      navigate('/notfound')
    }
    fetch_client(uid);
  }, []);

  const sigCanvas = useRef(null);
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
    try {
      if(!requestData.name || !requestData.phone_number || !signature){
        return toast.error('Please fill all the fields!')
      }
      sign_agreement(requestData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="100vh" style={{ height: "calc(100vh + 120px)" }}>
      <Navbar is_client={true} />
      <div className="row g-0 h-100 d-flex justify-content-center">
        <>
          <div className="col-md-9 d-flex flex-column justify-content-center align-items-center">
            <div className="w-md-75 p-md-0 p-4">
              <h2>Heyyy {client.client_name}!</h2>
              <h4>
                {" "}
                We're excited to have you on board! 🎉 Your journey with us
                begins now, and we’re here to ensure a smooth and efficient
                experience.
              </h4>
              <div className="mb-3 mt-5">
                <label className="form-label d-flex align-items-center">
                  <h4 className="m-0">Name </h4>
                  <span className="ms-2">i.e, Name to be in the agreement</span>
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
                    height: isMobile ? 200 : 150,
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
        </>
      </div>
    </div>
  );
}

{
  /* <div className="col-md-6  d-flex justify-content-center align-items-center">
<embed src="/template/template_agreement.pdf" style={{height: '100%', width: '90%'}} type="application/pdf" />
</div> */
}
