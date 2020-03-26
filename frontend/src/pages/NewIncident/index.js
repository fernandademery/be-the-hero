import React, { useState } from "react";
import "./styles.css";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  const ongId = localStorage.getItem("ongId");

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post("incidents", data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push("/profile");
    } catch (err) {
      alert("Something went wrong. Please, try again later.");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />
          <h1> Register new project </h1>{" "}
          <p> Explain your project and ask for help </p>{" "}
          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="E02041" />
            Back to your profile{" "}
          </Link>{" "}
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Project title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />{" "}
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />{" "}
          <input
            placeholder="Amount needed"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="submit">
            Submit{" "}
          </button>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
}
