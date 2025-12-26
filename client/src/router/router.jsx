import { createBrowserRouter, Navigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Error from "../components/Error";
import Contacts from "../components/Contacts";
import AddContact from "../components/AddContact";
import ViewContact from "../components/ViewContact";
import DeleteContact from "../components/DeleteContact";
import EditContact from "../components/EditContact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to="contactlist" replace /> },
      { path: "contactlist", element: <Contacts /> },
      { path: "addcontact", element: <AddContact /> },
      { path: "view/:id", element: <ViewContact /> },
      { path: "delete/:id", element: <DeleteContact></DeleteContact> },
      {
        path: "edit/:id",
        element: <EditContact></EditContact>,
      },
    ],
  },
]);
export default router;
