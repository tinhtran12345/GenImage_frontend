import { createBrowserRouter } from "react-router-dom";
import { path } from "../constants";
import HomePage from "../pages/HomePage";
export const router = createBrowserRouter([
    {
        path: path.HOMEPAGE,
        element: <HomePage />,
    },
]);
