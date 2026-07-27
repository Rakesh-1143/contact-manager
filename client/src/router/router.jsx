import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "../Layout/Navbar";
import Error from "../components/Error";
import Contacts from "../components/Contacts";
import AddContact from "../components/AddContact";

const ViewContact = lazy(() => import("../components/ViewContact"));
const DeleteContact = lazy(() => import("../components/DeleteContact"));
const EditContact = lazy(() => import("../components/EditContact"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Navigate to="contactlist" replace /> },
        { path: "contactlist", element: <Contacts /> },
        { path: "addcontact", element: <AddContact /> },

        {
          path: "view/:id",
          element: (
            <Suspense fallback={<div>Loading contact...</div>}>
              <ViewContact />
            </Suspense>
          ),
        },

        {
          path: "delete/:id",
          element: (
            <Suspense fallback={<div>Deleting...</div>}>
              <DeleteContact />
            </Suspense>
          ),
        },

        {
          path: "edit/:id",
          element: (
            <Suspense fallback={<div>Loading editor...</div>}>
              <EditContact />
            </Suspense>
          ),
        },
      ],
    },
  ]
);

export default router;
