import React, { useState } from "react";
/* import "./Register.css"; */
import "../assets/bootstrap.min.css";
import Header from "../Header/Header"
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import close_icon from "../assets/close.png"

const Register = () => {
    // State variables for form inputs
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [userNameError, setUserNameError] = useState("");

    // Redirect to home
    const gohome = () => {
        window.location.href = window.location.origin;
    }

    // Handle form submission
    const register = async (e) => {
        e.preventDefault();

        let register_url = window.location.origin + "/djangoapp/register";

        // Send POST request to register endpoint
        const res = await fetch(register_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userName": userName,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
                "email": email
            }),
        });

        const json = await res.json();
        if (json.status) {
            // Save username in session and reload home
            sessionStorage.setItem('username', json.userName);
            window.location.href = window.location.origin;
        }
        else if (json.error === "Already Registered") {
            setUserNameError("This username already exists");
        }
    };

    return (
        <div>
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-7 col-lg-5">
                        <form className="border p-4 rounded shadow-sm" onSubmit={register}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="m-0">Register</h2>
                                <button
                                    type="button"
                                    className="btn"
                                    style={{
                                        color: "red",
                                        fontSize: "2rem",
                                        lineHeight: "1",
                                        padding: "0",
                                        border: "none",
                                        background: "transparent"
                                    }}
                                    aria-label="Close"
                                    onClick={() => gohome()}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputUsername">Username</label>
                                <input type="text" name="username"
                                    className={`form-control ${userNameError ? 'is-invalid' : ''}`}
                                    id="inputUsername" placeholder="Username"
                                    autoComplete="on" required onChange={(e) => setUserName(e.target.value)} />
                                {userNameError && (
                                    <div className="invalid-feedback">
                                        {userNameError}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputFirstName">First Name</label>
                                <input type="text" name="first_name" className="form-control" id="inputFirstName" placeholder="First Name"
                                    autoComplete="on" onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputLastName">Last Name</label>
                                <input type="text" name="last_name" className="form-control" id="inputLastName" placeholder="Last Name"
                                    autoComplete="on" onChange={(e) => setlastName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail">Email address</label>
                                <input type="email" name="email" className="form-control" id="inputEmail" aria-describedby="emailHelp"
                                    placeholder="Enter email" autoComplete="on" required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPassword">Password</label>
                                <input type="password" name="psw" className="form-control" id="inputPassword" placeholder="Password"
                                    autoComplete="on" required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary mt-4">Submit</button>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Register;
