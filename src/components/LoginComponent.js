import React from 'react';
import { useState } from "react";
import axios from 'axios';

const LoginComponent = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleUsernameChange = (e) => { setUsername(e.target.value) }
    const handlePasswordChange = (e) => { setPassword(e.target.value) }

    const handleLogin = async (e) => {
        axios.post('http://localhost:8000/login', {
            username: username,
            password: password
        }).then(response => {
            // If 403, show an error message
            if(response.status === 403) {
                console.error('Invalid credentials')
            } else {
                localStorage.setItem('token', response.data.token)
                window.location.href = '/'
            }
        }).catch(error => {
            if(error.response.status === 403) {
                setErrorMessage('Invalid credentials')
            }
        })


        e.preventDefault()
    }

    return (
        <div className="centerVertically">
            <div className="card">
                <div className="card-header">
                    <h2 className="text-center pt-3">HAUPCAR</h2>
                    <p className="text-center">Login to the Car Management System</p>
                </div>
                <div className="card-body">
                    <form action="#">
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" value={username}
                                   onChange={handleUsernameChange}/>
                        </div>
                        <br/>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" value={password}
                                   onChange={handlePasswordChange}/>
                        </div>
                        <br/>
                        { errorMessage ? (<div className="alert alert-danger">
                            { errorMessage }
                        </div>) : null }
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
    </div>
    );
}
export default LoginComponent;