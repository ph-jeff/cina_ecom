import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import cart_icon from "../assets/cart.svg";
import user_icon from "../assets/user.svg";
import Loading from "./Loading";

const NavigationBar = () => {
    const { user } = useAuthContext();
    const { logout, isLoading } = useLogout();
    function userLogout() {
        logout();
    }
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    function searchItem() {
        navigate('/product/search?value=' + query);
        // setQuery("");
    }

    useEffect(() => {
        // This effect runs when the route changes
        return () => {
            // Reset the query state when navigating to another route
            setQuery('');
        };
    }, [navigate]);

    return (
        <>
            {isLoading && <Loading />}

            <nav className="shadow-md bg-[#000000] p-4 flex flex-col lg:flex-row items-center justify-between">
                {/* Logo on the left side */}
                <div className="flex items-center">
                    <Link to="/">
                        {/* <img className="h-8 w-8 mr-2" src="/path/to/logo.png" alt="Logo" /> */}
                        <span className="text-[#C4A353] text-xl font-semibold mr-4">CINA</span>
                    </Link>
                </div>

                <div className="flex items-center text-slate-200">
                    <Link className="px-5 border" to="/">
                        Home
                    </Link>
                    <Link className="px-5 border" to="/category?value=women">
                        Women
                    </Link>
                    <Link className="px-5 border" to="/category?value=men">
                        Men
                    </Link>
                    <Link className="px-5 border" to="/brand">
                        Brands
                    </Link>
                    <Link className="px-5 border" to="/sale">
                        Sale
                    </Link>
                </div>

                {/* Navigation items on the right side */}
                <div className="flex items-center mt-4 lg:mt-0">
                    <div className="relative mr-4">
                        <div>
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                type="text"
                                className="py-1 px-3 border rounded-lg bg-black text-slate-200 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Search..."
                            />
                            <button onClick={searchItem} className="border-none">
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-slate-200"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M13.293 14.293a1 1 0 011.414 0l4 4a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414zM9 16a7 7 0 100-14 7 7 0 000 14z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Cart Icon */}
                    <Link to="/cart">
                        <div className="mr-4">
                            <img
                                className="h-10 w-10 px-1 py-1 hover:bg-gray-700 hover:rounded cursor-pointer"
                                src={cart_icon}
                                alt=""
                            />
                        </div>
                    </Link>

                    {user ? (
                        <>
                            <Link to="/account">
                                <div className="mr-4">
                                    <img
                                        className="h-10 w-10 px-2 py-1 hover:bg-gray-700 hover:rounded cursor-pointer"
                                        src={user_icon}
                                        alt=""
                                    />
                                </div>
                            </Link>
                            <span>
                                <div className="mr-4">
                                    <button
                                        onClick={userLogout}
                                        className="text-[#C4A353] py-1 px-1 hover:bg-gray-700 hover:rounded cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </span>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <div className="mr-4">
                                    <span className="text-[#C4A353] py-1 px-1 hover:bg-gray-700 hover:rounded cursor-pointer">
                                        Login
                                    </span>
                                </div>
                            </Link>

                            <Link to="/register">
                                <div className="mr-4">
                                    <span className="text-[#C4A353] py-1 px-1 hover:bg-gray-700 hover:rounded cursor-pointer">
                                        Register
                                    </span>
                                </div>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default NavigationBar;
