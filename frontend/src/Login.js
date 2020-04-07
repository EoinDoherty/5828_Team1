import React, { useState } from 'react';
import Home from './Home'

function addEnterHandler(callback) {
    return (event) => {
        if (event.key === 'Enter') {
            callback(event);
        }
    }
}

function Login() {

    const [message, setMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");

    let handleSubmit = (event) => {
        const user = document.getElementById("username").value;
        const pwd = document.getElementById("password").value;
    
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'username': user,
                'password': pwd
            })
        };

        fetch('api/login', requestOptions)
            .then(response => response.json())
            .then(data => {if (data["token"]) {
                setToken(data["token"]);
                setLoggedIn(true);
            }
            setMessage(data["msg"]);
        });
    }

    if (loggedIn) {
        return <Home token={token}/>
    }

    return (
        <div className="Login">
            <h3>Login</h3>
            <p>{message}</p>
            Username:
            <input id="username" type="text" onKeyDown={addEnterHandler(handleSubmit)}/><br></br>

            Password:
            <input id="password" type="password" onKeyDown={addEnterHandler(handleSubmit)}/><br></br>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Login;