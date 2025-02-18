import React, { useState } from "react";
import "./ClientCard.css";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { useApi } from "../../../contexts/ApiContext";
export default function ClientCard({ client }) {
  const { unsign_agreement, complete_project } = useApi();

  const copythelink = () => {
    try {
      const link = `http://localhost:5000/sign-agreement/${client.uid}`;
      navigator.clipboard.writeText(link);
      toast.success("Copied to Clipboard");
    } catch (e) {
      toast.error(e.message || "Couldn't copy the url");
    }
  };

  const handle_complete_project = (uid) => {
    complete_project(uid);
  };

  const handle_client_unsign = (uid) => {
    unsign_agreement(uid);
  };

  return (
    <div className="card client-card position-relative px-md-5 px-3 py-4 my-3 mx-3 z-1">
      <div className="card-body  row g-0">
        <div className="col-md-6">
          <p>
            <strong>
              Client: <h3>{client.client_name || client.name}</h3>{" "}
            </strong>
          </p>
          <p className="mt-3">
            <strong>Email: </strong>
            {client.email}
          </p>
          <p>
            <strong>UID: </strong>
            {client.uid}
          </p>
          <p>
            <strong>Phone number: </strong>
            {client.phone_number}
          </p>
          <p>
            <strong>Agreement Signed:</strong>{" "}
            {client.is_agreement_updated ? "Signed" : "Not Signed"}
          </p>
          <p>
            <strong>Project Status: </strong>
            {client.is_project_completed ? "Completed" : "Not completed"}
          </p>
        </div>
        <div className="col-md-6">
          <p>
            {client.is_project_completed ? (
              <p>
                <button>View Agreement</button>
              </p>
            ) : (
              <p>
                <button onClick={copythelink}>
                  <FaCopy /> Agreement Link
                </button>
              </p>
            )}
          </p>
          <p>
            {client.is_agreement_updated && !client.is_project_completed ? (
              <>
                <p>
                  <button onClick={() => handle_complete_project(client.uid)}>
                    Mark completed
                  </button>
                </p>
              </>
            ) : (
              ""
            )}
          </p>
          {!client.is_project_completed ? (
            <p>
            <button onClick={() => handle_client_unsign(client.uid)}>
              Unsign Agreement
            </button>
          </p>
          ): ('')}
        </div>
      </div>
      {client.is_project_completed ? (
        <div className="position-absolute bottom-0 end-0 z-3">
          <img src="/imgs/baked.png" className="baked-img" alt="" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
