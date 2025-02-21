import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import './Clients.css'
import ClientCard from "./ClientCard/ClientCard";
import { useApi } from "../../contexts/ApiContext";
import { useNavigate } from "react-router-dom";

export default function Clients() {
  //   const [clients, setClients] = useState([]);

  const { clients, isAdmin } = useApi();

  const [searchTerm, setSearchTerm] = useState("");


  const [filterType, setFilterType] = useState("all"); // 'all', 'completed', 'not_completed', 'agreement_signed', 'not_signed'
  
  let filteredClients = clients.filter(client =>
    client.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone_number.toString().includes(searchTerm)
  );
  
  if (filterType === "completed") {
    filteredClients = filteredClients.filter(client => client.is_project_completed);
  } else if (filterType === "not_completed") {
    filteredClients = filteredClients.filter(client => !client.is_project_completed);
  } else if (filterType === "agreement_signed") {
    filteredClients = filteredClients.filter(client => client.is_agreement_updated);
  } else if (filterType === "not_signed") {
    filteredClients = filteredClients.filter(client => !client.is_agreement_updated);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      toast.alert("We tracked you. Dont try to log in .");
      return navigate("/login");
    }
  },[]);
  

  return (
    <div className="clients_page">
      <Navbar />
      <div className="row g-0 d-flex justify-content-center align-items-center">
        <div className="col-md-7">
        <div className="my-3 sort_section">
<div className="row g-0 d-flex justify-content-center align-items-center">
  <div className="col-md-12">        <input
  type="text"
  placeholder="Search clients"
  className="search"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/></div>
</div>
          <div className="sort_buttons">
         <div className="row g-2 d-flex justify-content-around m-1">
         <h5>Sort By</h5>
<div className="col-md-2"><button onClick={() => setFilterType("all")}>All</button></div>
<div className="col-md-2">          <button onClick={() => setFilterType("completed")}>Completed</button></div>

<div className="col-md-2"><button onClick={() => setFilterType("not_completed")}>Not Completed</button></div>
<div className="col-md-2"><button onClick={() => setFilterType("agreement_signed")}>Agreement Signed</button></div>
<div className="col-md-2"><button onClick={() => setFilterType("not_signed")}>Not Agreement Signed</button></div>
         
</div>
        
          </div>
        </div>

          <div className="client_container">
          {filteredClients.map((client, idx) => {
            return (
              <ClientCard
                client={client}
                key={idx}
              />
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}
