import React from "react";
import "./Navbar.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Context/auth";
import Logo from "../assets/image.png";
const Navbar = () => {
  const [auth, setAuth] = useAuth();
  console.log(auth?.name);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({
      ...auth,
      name: null,
      token: "",
    });
    localStorage.removeItem("auth");
    setAuth(null);
    toast.success("Logout Success");
    navigate("/");
  };
  return (
    <div className=" navbar_main">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img
            className="navbar-brand logo"
            src={Logo}
            onClick={() => navigate("/")}
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mr-10">
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="/models">
                  Models
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Docs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Blog
                </a>
              </li>
              {auth?.name ? (
                <li className="nav-item d-flex ml-4 dropdown">
                  <li
                    className="nav-link name dropdown"
                    onClick={toggleDropdown}
                  >
                    <strong>{auth.name}</strong>
                  </li>
                  {isDropdownVisible && (
                    <>
                      <div className="dropdown-content">
                        <p onClick={handleLogout}>Sign out</p>
                      </div>
                    </>
                  )}
                </li>
              ) : (
                <li className="nav-item ">
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
