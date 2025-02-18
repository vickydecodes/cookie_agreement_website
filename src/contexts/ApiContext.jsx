import { useContext, createContext, useState, useEffect } from "react";
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from "../utils/ApiService";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import urls from "../utils/ApiUrls";
import { getCookie, setCookie, removeCookie } from "../utils/CookieService";
import Loading from "../pages/components/Loading/Loading";

const ApiContext = createContext();

export function useApi() {
  return useContext(ApiContext);
}

const { registrationUrl } = urls;

console.log(urls);

export function ApiProvider({ children }) {
  const navigate = useNavigate();
  const {
    signup,
    loginFirebase,
    verifyEmailFirebase,
    logout,
    currentUser,
    forgetPasswordFirebase,
  } = useAuth();

  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [clients, setClients] = useState([])

  const register = async (data) => {
    try {
      removeCookie("userCredentials");
      setLoading(true);
      const user = await signup(data.email, data.password);
      if (user) {
        const formData = createFormData(data, { uid: user.user.uid }, [
          "password",
        ]);
        console.log({ formData, data });
        const res = await postRequest(registrationUrl, {
          uid: user.user.uid,
          name: data.username,
          email: data.email,
        });
        toast.success(res.message);
        navigate("/");
      }
    } catch (e) {
      handleFirebaseError(e);
      navigate("/register");
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    setLoading(true);
    try {
      removeCookie("userCredentials");
      const user = await loginFirebase(data.email, data.password);

      if (user) {
        navigate("/");
      } else {
        toast.error("Invalid Credentials");
      }
      // fetchUserData(user.user.uid, true);
    } catch (e) {
      console.log(e);
      handleFirebaseError(e);
    } finally {
      setLoading(false);
    }
  };

  const create_user = async (data) => {
    try {
      const response = await postRequest("http://localhost:5000/create-user", {
        email: data.email,
        client_name: data.client_name,
      });

      if (response) {
        toast.success("Successfully created the user");
        setGeneratedLink(response.link);
      } else {
        toast.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const unsign_agreement = async (uid) => {
      try {
        const response = await postRequest(
          "http://localhost:5000/unsign-agreement",
          { uid: uid }
        );
        toast.success(response.message);
        fetch_clients();
      } catch (e) {
        console.log(e);
        toast.error(e.message);
      }
    };


  const fetch_clients = async () => {
    try {
      const res = await getRequest("http://localhost:5000/clients");
      console.log('res', res)
      setClients(res.clients);
    } catch (e) {
      toast.error(e.message || 'Something Went Wrong fetching clients.')
      console.log(e)
    }
  };

  const sign_agreement = async(data) => {

  }

  ////UTILITY FUNCTIONS////

  ///FORM DATA BINDING////

  function createFormData(data, extraFields = {}, excludeKeys = []) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (!excludeKeys.includes(key)) {
        formData.append(key, value);
      }
    });

    Object.entries(extraFields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  }

  ///END UTILS

  /// USE EFFECT HOOKS

  useEffect(() => {
fetch_clients()
  }, [])



  /// ERROR HANDLING FOR FIREBASE ERRORS

  const handleFirebaseError = (e) => {
    const errorCode = e.code;
    const errorMessage = e.message;

    switch (errorCode) {
      case "auth/invalid-email":
        toast.error(
          "The email address is invalid. Please enter a valid email."
        );
        break;
      case "auth/user-not-found":
        toast.error(
          "No user found with this email. Please check your email or sign up."
        );
        break;
      case "auth/wrong-password":
        toast.error(
          "Incorrect password. Please try again or reset your password."
        );
        break;
      case "auth/email-already-in-use":
        toast.error("This email is already in use.");
        break;
      case "auth/weak-password":
        toast.error(
          "The password is too weak. Please choose a stronger password."
        );
        break;
      case "auth/invalid-credential":
        toast.error(
          "The email or password you entered is invalid. Please try again."
        );
        break;
      case "auth/user-disabled":
        toast.error(
          "This account has been disabled. Please contact support for assistance."
        );
        break;
      case "auth/too-many-requests":
        toast.error("Too many attempts. Please try again later.");
        break;
      case "auth/operation-not-allowed":
        toast.error("This operation is not allowed. Please contact support.");
        break;
      case "auth/expired-action-code":
        toast.error("The action code has expired. Please try again.");
        break;
      case "auth/network-request-failed":
        toast.error(
          "Network error. Please check your internet connection and try again."
        );
        break;
      case "auth/invalid-verification-code":
        toast.error(
          "Invalid verification code. Please check the code and try again."
        );
        break;
      default:
        toast.error(errorMessage || "Something went wrong. Please try again.");
    }
  };

  ///ERROR HANDLING FOR LOADINGS AND ERRORS

  const value = { register, login, generatedLink, create_user, clients, fetch_clients, unsign_agreement };

  if (loading) {
    console.log("Loading state: ", loading);
    return <Loading />;
  }

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}
