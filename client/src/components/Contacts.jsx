import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Contacts() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [name, setName] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/contacts");
      setData(res.data);
      setFilterData(res.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const filtered = data.filter((obj) =>
      obj.name.toLowerCase().includes(name.toLowerCase())
    );
    const timer = setTimeout(() => {
      setFilterData(filtered);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [name, data]);
  return (
    <div className="container-fluid px-3 px-md-5 mt-3">
      <div className="d-flex justify-content-between align-items-center pb-3">
        <div className="input-group w-25 ms-4 shadow-sm rounded-3 overflow-hidden">
          <input
            type="text"
            className="form-control border-0 ps-3"
            placeholder="Search contacts"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn btn-dark text-warning px-3" type="button">
            <i className="bi bi-search"></i>
          </button>
        </div>
        <Link
          to="/addcontact"
          className="btn btn-dark text-warning px-4 py-2 fs-6 rounded-3 shadow-sm hover-scale"
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Contact
        </Link>
      </div>
      <div className="row g-3">
        {filterData.length > 0 ? (
          filterData.map((card) => (
            <div key={card.id} className="col-12 col-md-6 col-lg-4">
              <div className="card border rounded p-3 h-100 bg-white shadow-sm hover-scale-sm">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/7980/7980574.png"
                    alt="user"
                    className="img-fluid"
                    style={{ width: "90px" }}
                  />

                  <div>
                    <h6 className="mb-1">Name: {card.name}</h6>
                    <h6 className="mb-0">Contact: {card.contact}</h6>
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-3">
                  <Link
                    to={`/view/${card.id}`}
                    className="btn btn-warning btn-sm w-25 text-white d-flex align-items-center justify-content-center gap-1"
                  >
                    <i className="bi bi-eye"></i>
                    View
                  </Link>

                  <Link
                    to={`/edit/${card.id}`}
                    className="btn btn-primary btn-sm w-25 d-flex align-items-center justify-content-center gap-1"
                  >
                    <i className="bi bi-pen"></i>
                    Edit
                  </Link>

                  <Link
                    to={`/delete/${card.id}`}
                    className="btn btn-danger btn-sm w-25 d-flex align-items-center justify-content-center gap-1"
                  >
                    <i className="bi bi-trash3"></i>
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted mt-4">No contacts found</div>
        )}
      </div>
    </div>
  );
}

export default Contacts;
