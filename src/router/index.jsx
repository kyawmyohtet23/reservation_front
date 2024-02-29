import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layouts/Layout";
import HomePage from "../pages/HomePage";
import Restaurant from "../pages/Restaurant";
import RestaurantDetail from "../pages/RestaurantDetail";
import FinalPage from "../pages/FinalPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/restaurants",
        element: <Restaurant />,
      },

      {
        path: "/restaurants/:slug",
        element: <RestaurantDetail />,
      },
      {
        path: "/restaurants/:slug/check-out",
        element: <FinalPage />,
      },
    ],
  },
]);

export default router;
