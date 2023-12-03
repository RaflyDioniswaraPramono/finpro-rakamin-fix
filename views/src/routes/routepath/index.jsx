import { createBrowserRouter } from "react-router-dom";
import { Welcome, Login, Register, Dashboard, Profile, Products, Suppliers, Distributors, SupplierReports, DistributorReports, SuperAdmins } from "../../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard/:id",
    element: <Dashboard />,    
  },
  {
    path: "super/dashboard/:id",
    element: <SuperAdmins />,
  },
  {
    path: "/profile/:id",
    element: <Profile />
  },
  {
    path: "/dashboard/:id/products",
    element: <Products />
  },
  {
    path: "/dashboard/:id/suppliers",
    element: <Suppliers />
  },
  {
    path: "/dashboard/:id/distributors",
    element: <Distributors />
  },
  {
    path: "/dashboard/:id/reports/suppliers",
    element: <SupplierReports />
  },  
  {
    path: "/dashboard/:id/reports/distributors",
    element: <DistributorReports />
  },  
]);

export default router;
