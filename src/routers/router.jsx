import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import ForgotPassword from "../components/ForgotPassword";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import SearchResults from "../pages/books/SearchResults";
import { AuthProvider } from "../context/AuthContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
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
                path: "/forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "/search",
                element: <SearchResults />,
            },
            {
                path: "/orders",
                element: <PrivateRoute><OrderPage /></PrivateRoute>,
            },
            {
                path: "/cart",
                element: <CartPage />,
            },
            {
                path: "/checkout",
                element: <PrivateRoute><CheckoutPage /></PrivateRoute>,
            },
            {
                path: "/books/:id",
                element: <SingleBook />,
            },
        ],
    },
    {
        path: "/admin",
        element: <AuthProvider><AdminLogin /></AuthProvider>,
    },
    {
        path: "/dashboard",
        element: <AuthProvider><AdminRoute><DashboardLayout /></AdminRoute></AuthProvider>,
        children: [
            {
                path: "",
                element: <Dashboard />,
            },
            {
                path: "manage-books",
                element: <ManageBooks />,
            },
            {
                path: "add-new-book",
                element: <AddBook />,
            },
            {
                path: "edit-book/:id",
                element: <UpdateBook />,
            },
        ],
    },
]);

export default router;