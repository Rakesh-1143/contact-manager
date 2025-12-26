import React from "react";
import { Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="bg-black bg-opacity-75 text-warning">
        <div className="container-fluid px-4 py-2">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2 fs-4 fw-semibold">
              <i className="bi bi-telephone-fill fs-4"></i>
              <span>Contact Manager</span>
            </div>

          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Navbar;
