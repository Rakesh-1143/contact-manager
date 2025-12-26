import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function DeleteContact() {
  const { id } = useParams();
  const navigate = useNavigate();

  async function delf() {
    await axios.delete(`http://localhost:5000/contacts/${id}`);
    navigate("/contactlist");
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark bg-opacity-50">
      <div
        className="card shadow-lg p-4 rounded-4 text-center"
        style={{ minWidth: "350px" }}
      >
        <h4 className="text-danger mb-3">Confirm Delete</h4>
        <p className="fs-5 mb-2">
          Are you sure you want to delete this contact: {id}
        </p>

        <div className="d-flex justify-content-around mt-4">
          <button
            className="btn btn-outline-secondary px-4 fs-5"
            onClick={() => navigate("/contactlist")}
          >
            Cancel
          </button>
          <button className="btn btn-danger px-4 fs-5" onClick={delf}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteContact;
