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
            alert("The user with same username is already registered");
        }
    };

    return (
        <div>
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-7 col-lg-5">
                        <form className="border p-4 rounded shadow-sm" onSubmit={register}>
                            <div className="form-group">
                                <label htmlFor="inputUsername">Username</label>
                                <input type="text" name="username" className="form-control" id="inputUsername" placeholder="Username"
                                    autoComplete="on" required onChange={(e) => setUserName(e.target.value)} />
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
            </div>





            {/*             <div className="register_container" style={{ width: "50%" }}>
                <div className="header" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <span className="text" style={{ flexGrow: "1" }}>SignUp</span>
                    <div style={{ display: "flex", flexDirection: "row", justifySelf: "end", alignSelf: "start" }}>
                        <a href="/" onClick={() => { gohome() }} style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
                            <img style={{ width: "1cm" }} src={close_icon} alt="X" />
                        </a>
                    </div>
                    <hr />
                </div>

                <form onSubmit={register}>
                    <div className="inputs">
                        <div className="input">
                            <img src={user_icon} className="img_icon" alt='Username' />
                            <input type="text" name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div>
                            <img src={user_icon} className="img_icon" alt='First Name' />
                            <input type="text" name="first_name" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)} />
                        </div>

                        <div>
                            <img src={user_icon} className="img_icon" alt='Last Name' />
                            <input type="text" name="last_name" placeholder="Last Name" className="input_field" onChange={(e) => setlastName(e.target.value)} />
                        </div>

                        <div>
                            <img src={email_icon} className="img_icon" alt='Email' />
                            <input type="email" name="email" placeholder="email" className="input_field" onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="input">
                            <img src={password_icon} className="img_icon" alt='password' />
                            <input name="psw" type="password" placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)} />
                        </div>

                    </div>
                    <div className="submit_panel">
                        <input className="submit" type="submit" value="Register" />
                    </div>
                </form>
            </div> */}
        </div>
    )
}

export default Register;
