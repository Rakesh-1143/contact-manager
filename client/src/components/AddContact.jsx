import React from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

// Validation schema
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  contact: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9]{10}$/, "Contact number must be a valid 10-digit number"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  state: yup.string().required("State is required"),
});

function AddContact() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      email: "",
      state: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        await api.post("/contacts", values);
        formik.resetForm();
        navigate("/contactlist");
      } catch (error) {
        console.error("Error adding contact:", error);
      }
    },
  });

  const getFieldClass = (fieldName) => {
    return `form-control ${
      formik.touched[fieldName] && formik.errors[fieldName]
        ? "is-invalid"
        : formik.touched[fieldName]
          ? "is-valid"
          : ""
    }`;
  };

  return (
    <div className="container mt-4">
      <form
        onSubmit={formik.handleSubmit}
        className="col-12 col-md-6 col-lg-4 mx-auto bg-dark bg-opacity-75 p-4 rounded"
      >
        <h3 className="text-center text-white mb-4">Contact Details</h3>

        <div className="mb-3">
          <label className="form-label fs-5 text-white" htmlFor="name">
            Name
          </label>
          <input
            className={getFieldClass("name")}
            type="text"
            name="name"
            id="name"
            value={formik.values.name}
            placeholder="Enter name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="invalid-feedback d-block">{formik.errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label fs-5 text-white" htmlFor="contact">
            Contact Number
          </label>
          <input
            className={getFieldClass("contact")}
            name="contact"
            type="text"
            id="contact"
            placeholder="Enter 10-digit contact number"
            value={formik.values.contact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.contact && formik.errors.contact && (
            <div className="invalid-feedback d-block">
              {formik.errors.contact}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label fs-5 text-white" htmlFor="email">
            Email Id
          </label>
          <input
            className={getFieldClass("email")}
            type="email"
            name="email"
            id="email"
            placeholder="Enter email Id"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="invalid-feedback d-block">
              {formik.errors.email}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label fs-5 text-white" htmlFor="state">
            State
          </label>
          <select
            name="state"
            id="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-select ${
              formik.touched.state && formik.errors.state
                ? "is-invalid"
                : formik.touched.state
                  ? "is-valid"
                  : ""
            }`}
          >
            <option value="">Choose your state</option>
            <option value="India">India</option>
            <option value="United State">United States</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Japan">Japan</option>
            <option value="Thailand">Thailand</option>
          </select>
          {formik.touched.state && formik.errors.state && (
            <div className="invalid-feedback d-block">
              {formik.errors.state}
            </div>
          )}
        </div>

        <div className="row justify-content-between px-4">
          <button
            type="button"
            onClick={() => navigate("/contactlist")}
            className="btn btn-outline-warning w-25  fw-semibold"
          >
            cancel
          </button>
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="btn btn-warning w-25 fw-semibold"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddContact;
