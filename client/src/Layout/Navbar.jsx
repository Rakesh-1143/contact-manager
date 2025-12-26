import React from "react";
import { Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="bg-black bg-opacity-75 text-warning">
        <div className="container-fluid px-4 py-2">
          <div className="d-flex align-items-center justify-content-between">

            {/* Title */}
            <div className="d-flex align-items-center gap-2 fs-4 fw-semibold">
              <i className="bi bi-telephone-fill fs-4"></i>
              <span>Contact Manager</span>
            </div>

            {/* Search */}
            <div className="input-group w-25">
              <input
                type="text"
                className="form-control bg-white bg-opacity-50 text-dark border-0"
                placeholder="Search contacts"
              />
              <span className="input-group-text bg-dark border-0 text-warning">
                <i className="bi bi-search"></i>
              </span>
            </div>

          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Navbar;
