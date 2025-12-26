import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditContact() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [obj, setObj] = useState({
    name: "",
    contact: "",
    email: "",
    state: "",
  });
  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await axios.get(`http://localhost:5000/contacts/${id}`);
        setObj(res.data);
      } catch (error) {
        console.error("Error fetching contact", error);
      }
    }
    fetchContact();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;

    setObj((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(obj);
    await axios.put(`http://localhost:5000/contacts/${id}`, obj);
    setObj({
      name: "",
      contact: "",
      email: "",
      state: "",
    });
    navigate("/contactlist");
  }

  return (
    <div className="container mt-4">
      <form
        onSubmit={handleSubmit}
        className="col-12 col-md-6 col-lg-4 mx-auto bg-dark bg-opacity-75 p-4 rounded"
      >
        <h3 className="text-center text-white mb-4">Contact Details</h3>

        <div className="mb-3">
          <label className="form-label fs-5 text-white" htmlFor="name">
            Name
          </label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            value={obj.name}
            placeholder="Enter name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fs-5 text-white" htmlFor="phone">
            Contact Number
          </label>
          <input
            className="form-control"
            name="contact"
            type="text"
            id="phone"
            placeholder="Enter contact number"
            value={obj.contact}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fs-5 text-white" htmlFor="email">
            Email Id
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            placeholder="Enter email Id"
            value={obj.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="form-label fs-5 text-white" htmlFor="state">
            state
          </label>
          <select
            name="state"
            id="state"
            value={obj.state}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Choose your state</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Japan">Japan</option>
            <option value="Thailand">Thailand</option>
          </select>
        </div>

        <div className="row justify-content-between px-4">
          <button
            type="button"
            onClick={() => navigate("/contactlist")}
            className="btn btn-outline-warning w-25  fw-semibold"
          >
            cancel
          </button>
          <button type="submit" className="btn btn-warning w-25 fw-semibold">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditContact;
