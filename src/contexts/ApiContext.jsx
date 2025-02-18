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

const { creationUrl, unsign_agreement_url, sign_agreement_url, fetch_client_url,fetch_clients_url,complete_project_url } = urls;

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
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({});
  const [admin, setAdmin] = useState({});
  const [isAdmin, setIsAdmin] = useState(() => {
    const is_verified_admin = getCookie("isAdmin");

    if (!is_verified_admin) {
      return false;
    } else {
      return true;
    }
  });

  console.log({ admin: admin });


  const login = async (data) => {
    setLoading(true);
    try {
      const user = await loginFirebase(data.email, data.password);
      if (user) {
        navigate("/admin");
        setCookie('isAdmin', true)
        setIsAdmin(true)
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (e) {
      toast.error('Black sheep, you are not the admin.')
    } finally {
      setLoading(false);
    }
  };

  const create_user = async (data) => {
    setLoading(true);

    try {
      const response = await postRequest( creationUrl, {
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
    } finally {
      setLoading(false);
    }
  };

  const unsign_agreement = async (uid) => {
    setLoading(true);

    try {
      const response = await postRequest(
        unsign_agreement_url,
        { uid: uid }
      );
      toast.success(response.message);
      fetch_clients();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const complete_project = async (uid) => {
    setLoading(true);
    try {
      const response = await postRequest(
        complete_project_url,
        { uid: uid }
      );
      toast.success(response.message);
      fetch_clients();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const fetch_clients = async () => {
    setLoading(true);
    try {
      const res = await getRequest(fetch_clients_url);
      setClients(res.clients);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const fetch_client = async (uid) => {
    setLoading(true);
    try {
      const res = await getRequest(`${fetch_client_url}/${uid}`);
      console.log("res", res);
      setClient(res.client);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const sign_agreement = async (data) => {
    setLoading(true);
    try {
      console.log(data);
      const res = await fetch(sign_agreement_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      console.log(response);
      fetch_clients();

      toast.success(response.message);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

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
    fetch_clients();
  }, []);

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

  const value = {
    login,
    generatedLink,
    create_user,
    clients,
    fetch_clients,
    unsign_agreement,
    sign_agreement,
    complete_project,
    fetch_client,
    client,
    isAdmin
  };

  if (loading) {
    console.log("Loading state: ", loading);
    return <Loading />;
  }

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}
