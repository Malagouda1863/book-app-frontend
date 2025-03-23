import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineShoppingCart } from "react-icons/hi2";

import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";

// Navigation links for all users
const navigation = [
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check out", href: "/checkout" },
];

// Admin-only navigation links
const adminNavigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Manage Books", href: "/dashboard/manage-books" },
    { name: "Add Book", href: "/dashboard/add-new-book" },
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems);

    const { currentUser, logout } = useAuth();

    const handleLogOut = () => {
        logout();
    };

    // Decode the token to get the user's role
    const token = localStorage.getItem("token");
    const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-6">
            <nav className="flex justify-between items-center">
                {/* Left side */}
                <div className="flex items-center md:gap-16 gap-4">
                    <Link to="/">
                        <HiMiniBars3CenterLeft className="size-6" />
                    </Link>

                    {/* Search */}
                    <SearchBar />
                </div>

                {/* Right side */}
                <div className="relative flex items-center md:space-x-3 space-x-2">
                    <div>
                        {currentUser ? (
                            <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img
                                        src={avatarImg}
                                        alt=""
                                        className={`size-7 rounded-full ${
                                            currentUser ? "ring-2 ring-blue-500" : ""
                                        }`}
                                    />
                                </button>
                                {/* Show dropdown */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                        <ul className="py-2">
                                            {/* Common navigation links */}
                                            {navigation.map((item) => (
                                                <li
                                                    key={item.name}
                                                    onClick={() => setIsDropdownOpen(false)}
                                                >
                                                    <Link
                                                        to={item.href}
                                                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}

                                            {/* Admin-only navigation links */}
                                            {user?.role === "admin" &&
                                                adminNavigation.map((item) => (
                                                    <li
                                                        key={item.name}
                                                        onClick={() => setIsDropdownOpen(false)}
                                                    >
                                                        <Link
                                                            to={item.href}
                                                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}

                                            <li>
                                                <button
                                                    onClick={handleLogOut}
                                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link to="/login">
                                <HiOutlineUser className="size-6" />
                            </Link>
                        )}
                    </div>

                    <Link
                        to="/cart"
                        className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
                    >
                        <HiOutlineShoppingCart className="" />
                        {cartItems.length > 0 ? (
                            <span className="text-sm font-semibold sm:ml-1">
                                {cartItems.length}
                            </span>
                        ) : (
                            <span className="text-sm font-semibold sm:ml-1">0</span>
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;