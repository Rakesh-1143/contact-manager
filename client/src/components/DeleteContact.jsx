import api from "../api/api";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

// Validation schema for delete confirmation
const validationSchema = yup.object().shape({
  confirmDelete: yup
    .boolean()
    .oneOf([true], "You must confirm to delete this contact"),
});

function DeleteContact() {
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      confirmDelete: false,
    },
    validationSchema,
    onSubmit: async () => {
      try {
        await api.delete(`/contacts/${id}`);
        navigate("/contactlist");
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    },
  });

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

        <form onSubmit={formik.handleSubmit}>
          <div className="form-check mb-3 text-start">
            <input
              className="form-check-input"
              type="checkbox"
              name="confirmDelete"
              id="confirmDelete"
              checked={formik.values.confirmDelete}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="form-check-label" htmlFor="confirmDelete">
              I confirm that I want to delete this contact permanently
            </label>
            {formik.touched.confirmDelete && formik.errors.confirmDelete && (
              <div className="invalid-feedback d-block text-danger mt-2">
                {formik.errors.confirmDelete}
              </div>
            )}
          </div>

          <div className="d-flex justify-content-around mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary px-4 fs-5"
              onClick={() => navigate("/contactlist")}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formik.values.confirmDelete || formik.isSubmitting}
              className="btn btn-danger px-4 fs-5"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
