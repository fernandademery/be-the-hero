import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import "./styles.css";
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

export default function Login() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { id });
      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push("/profile");
    } catch (err) {
      alert("Login failed. Please try again.");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero" />
        <form onSubmit={handleLogin}>
          <h1> Login </h1>{" "}
          <input
            placeholder="Your ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />{" "}
          <button type="submit" className="button">
            Submit{" "}
          </button>{" "}
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="E02041" />
            Click here to sign up!
          </Link>{" "}
        </form>{" "}
      </section>{" "}
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
