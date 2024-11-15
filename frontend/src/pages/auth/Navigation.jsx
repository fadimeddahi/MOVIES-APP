import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/auth";
import { useLogoutMutation } from "../../redux/api/users";

const Navigation = () => {
  const { user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="fixed bottom-10 left-[70rem] transform -translate-x-1/2 translate-y-1/2 z-50 bg-[#0f0f0f] border w-[30%] px-[4rem] mb-[2rem] rounded">
      <section className="flex justify-between items-center py-4">
        <div className="flex items-center justify-center mb-[1rem]">
          <Link to="/" className="text-2xl text-white">
            <AiOutlineHome className="mr-2 mt-[3rem]" size={30} />
            <span className="hidden nav-item-name mt-[3rem]">Home</span>
          </Link>
          <Link
            to="/movies"
            className="flex items-center transition-transform transform hover:translate-x-2 ml-4"
          >
            <MdOutlineLocalMovies size={30} className="mr-2 mt-12" />
            <span className="hidden nav-item-name mt-12">Movies</span>
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-gray-800 focus:outline-none"
          >
            {user ? (
              <span className="text-white">{user.username}</span>
            ) : (
              <span className="text-white">Login</span>
            )}
            {user && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>

          {dropdownOpen && user && (
            <ul
              className={`absolute right-0 mt-2 mr-14 w-[10rem] space-y-2 bg-white text-gray-600 ${
                !user.isAdmin ? "-top-20" : "-top-24"
              }`}
            >
              {user.isAdmin && (
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
              )}

              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}

           {!user && (
            <ul className="flex">
              <li>
                <Link
                  to="/login"
                  className="flex items-center mt-5 transition-transform transform hover:translate-x-2 mb-8"
                >
                  <AiOutlineLogin className="mr-2 mt-1 " size={30} />
                  <span className="hidden nav-item-name">Login</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center mt-5 transition-transform transform hover:translate-x-2 mb-8"
                >
                  <AiOutlineUserAdd className="mr-2 mt-1" size={30} />
                  <span className="hidden nav-item-name">Register</span>
                </Link>
              </li>
            </ul>
          )
            
          }


        </div>
      </section>
    </div>
  );
};

export default Navigation;
