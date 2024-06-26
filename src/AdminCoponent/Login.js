import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import loghome from "../images/loginhom.jpg";
import axios from 'axios';
import "../AllCss/login.css";

import { staffcontext } from '../staffcontext';
export default function Login() {
    const { setStaffcont } = useContext(staffcontext)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/login", {
                user: userType,
                name: username,
                password: password,
            });
            
            if (response) {

                if (userType === "Admin") {
                    navigate("/adminmain");
                } else if (userType === "Staff") {
                    navigate("/staffMain");
                } else if (userType === "Supplier") {
                    setStaffcont(response.data);
                    navigate("/supplierMain");
                }
            }

        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };

    return (
        <div>
            <img src={loghome} alt='loghome' className='loghome' />
            <div className='mx-auto'>
                <div className='bgsetting'>
                    <h1>Login</h1>
                    <form className='card p-5 w-50 mx-auto text-center form rounded-5 border-2 border-dark '>
                        <select className='form-select m-3 forms' value={userType} onChange={(e) => setUserType(e.target.value)}>
                            <option value="">Select User Type</option>
                            <option value="Admin">Admin</option>
                            <option value="Staff">Staff</option>
                            <option value="Supplier">Supplier</option>
                        </select>
                        <input
                            type="text"
                            className='form-control m-3 forms'
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            className='form-control m-3 forms'
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className='btn btn-primary w-100 m-3'
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
