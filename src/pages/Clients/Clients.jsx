import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import ClientCard from "./ClientCard/ClientCard";
import { toast } from "react-toastify";
import { postRequest } from "../../utils/ApiService";
import { useApi } from "../../contexts/ApiContext";

export default function Clients() {
  //   const [clients, setClients] = useState([]);

  const { clients, fetch_clients } = useApi();

  useEffect(() => {
    fetch_clients();
  }, []);



  //   useEffect(() => {
  //     const fetch_clients = async () => {
  //       const res = await axios.get("http://localhost:5000/clients");

  //       setClients(res.data.clients);
  //     };
  //     fetch_clients();
  //   }, []);

  return (
    <>
      <Navbar />
      <div className="row g-0 d-flex justify-content-center align-items-center">
        <div className="col-md-7">
          {clients.map((client, idx) => {
            return (
              <ClientCard
                client={client}
                key={idx}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
