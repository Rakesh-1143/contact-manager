import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ViewContact() {
  const [data, setData] = useState({});
  const { id } = useParams();

  async function getData() {
    const res = await axios(`http://localhost:5000/contacts/${id}`);
    setData(res.data);
  }

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="bg-dark opacity-75 text-center py-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7980/7980574.png"
                alt="user"
                className="img-fluid rounded-circle border border-3 border-white"
                style={{ width: "150px" }}
              />
              <h5 className="text-warning mt-3 mb-0">{data.name}</h5>
              <small className="text-light">Contact Profile</small>
            </div>

            <div className="card-body px-4 py-3">
              <div className="mb-3">
                <small className="text-muted">Contact</small>
                <div className="fw-semibold fs-6">{data.contact}</div>
              </div>

              <div className="mb-3">
                <small className="text-muted">Email</small>
                <div className="fw-semibold fs-6">{data.email}</div>
              </div>

              <div>
                <small className="text-muted">State</small>
                <div className="fw-semibold fs-6">{data.state}</div>
              </div>
            </div>

            {/* Footer */}
            <div className="card-footer bg-light text-center px-4 py-3">
              <Link to="/contactlist" className="btn btn-outline-secondary">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewContact;
