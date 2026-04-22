import React from 'react';
import { useState } from 'react';
import "../assets/style2.css";
import "../assets/bootstrap.min.css";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const logout = async (e) => {
    // Prevent the button/link from refreshing the page on its own
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    let logout_url = window.location.origin + "/djangoapp/logout";

    try {
      const res = await fetch(logout_url, {
        method: "GET", // Keep as GET for now since your view expects it
      });

      if (res.ok) {
        const json = await res.json();
        if (json) {
          // Clear session storage and reload page
          let username = sessionStorage.getItem('username');
          sessionStorage.removeItem('username');
          window.location.href = window.location.origin;
          window.location.reload();
          // Notify user of logout
          alert("Logging out " + username + "...")
        }
        else {
          alert("The user could not be logged out.")
        }
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const curr_user = sessionStorage.getItem('username');

  let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;

  const loggedIn = (
    <ul className="navbar-nav">
      <li className="nav-item me-lg-3 me-0" id="username">
        <a className="nav-link" style={{ fontSize: "larger" }} href="/profile">{curr_user}</a>
      </li>
      <li className="nav-item" id="logout">
        <a className="nav-link" style={{ fontSize: "larger" }} onClick={(e) => logout(e)} href="/">Logout</a>
      </li>
    </ul>
  )

  const loggedOut = (
    <ul className="navbar-nav">
      <li className="nav-item" id="login">
        <a className="nav-link" style={{ fontSize: "larger" }} href="/login">Login</a>
      </li>
      <li className="nav-item" id="register">
        <a className="nav-link" style={{ fontSize: "larger" }} href="/register">Register</a>
      </li>
    </ul>
  )

  return (
    <div style={{ marginBottom: "100px" }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top mb-1">
        <div className="container-fluid">
          <h2 style={{ paddingRight: "5%" }}>Dealerships</h2>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation"
            onClick={() => setIsNavOpen(!isNavOpen)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarText">
            <ul className="navbar-nav me-auto mb-0">
              <li className="nav-item">
                <a className="nav-link" style={{ fontSize: "larger" }} aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ fontSize: "larger" }} href="/about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ fontSize: "larger" }} href="/contact">Contact Us</a>
              </li>
            </ul>
            {isLoggedIn ? loggedIn : loggedOut}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
