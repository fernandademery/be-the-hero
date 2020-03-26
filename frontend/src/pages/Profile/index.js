import React, { useEffect, useState } from "react";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import "./styles.css";
import api from "../../services/api";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert("Operation failed. Try again.");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span> Welcome, {ongName} </span>{" "}
        <Link className="button" to="/incidents/new">
          Include new project{" "}
        </Link>{" "}
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>{" "}
      </header>
      <h1> Your projects </h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong> CASE: </strong>
            <p> {incident.title} </p>
            <strong> DESCRIPTION: </strong>
            <p>{incident.description} </p>
            <strong>AMOUNT:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>
            <button
              onClick={() => handleDeleteIncident(incident.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>{" "}
    </div>
  );
}
