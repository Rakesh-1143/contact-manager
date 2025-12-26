import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Contacts() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios("http://localhost:5000/contacts");
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <div className="container-fluid px-3 px-md-5 mt-3">
      <div className="d-flex justify-content-end mb-3">
        <Link
          to="/addcontact"
          className="btn bg-info text-dark px-4 py-2 fs-5 rounded-3"
        >
          Add +
        </Link>
      </div>

      <div className="row g-3">
        {data.map((card) => (
          <div key={card.id} className="col-12 col-md-6 col-lg-4">
            <div className="border rounded p-3 h-100">
              <div className="d-flex align-items-center gap-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7980/7980574.png"
                  alt="user"
                  className="img-fluid"
                  style={{ width: "100px" }}
                />

                <div>
                  <h6 className="mb-1">Name: {card.name}</h6>
                  <h6 className="mb-0">Contact: {card.contact}</h6>
                </div>
              </div>

              <div className="d-flex justify-content-between mt-3">
                <Link
                  to={`/view/${card.id}`}
                  className="btn btn-warning btn-sm px-4 py-1 text-white fs-6 w-25 rounded-2 d-flex align-items-center justify-content-center gap-1"
                >
                  <i className="bi bi-eye "></i>
                  View
                </Link>
                <Link
                  to={`/edit/${card.id}`}
                  className="btn btn-primary btn-sm px-4 py-1 text-white fs-6 w-25 rounded-2 d-flex justify-content-center align-items-center gap-1"
                >
                  <i class="bi bi-pen "></i>
                  Edit
                </Link>
                <Link
                  to={`/delete/${card.id}`}
                  className="btn btn-danger btn-sm px-4 py-1 text-white fs-6 w-25 rounded-2 d-flex justify-content-center align-items-center gap-1"
                >
                  <i class="bi bi-trash3 "></i>
                  Delete
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;
