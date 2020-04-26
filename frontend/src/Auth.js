import React, { useState } from 'react';
import Home from './Home'
import './Auth.css';

function addEnterHandler(callback) {
    return (event) => {
        if (event.key === 'Enter') {
            callback(event);
        }
    }
}

function Auth() {

    const [message, setMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");

    let handleLogin = (event) => {
        const user = document.getElementById("usernameLogin").value;
        const pwd = document.getElementById("passwordLogin").value;
    
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

    let handleSignUp = (event) => {
        const user = document.getElementById("usernameSU").value;
        const pwd = document.getElementById("passwordSU").value;
    
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'username': user,
                'password': pwd
            })
        };

        fetch('api/signup', requestOptions)
            .then(response => response.json())
            .then(data => {if (data["token"]) {
                setToken(data["token"]);
                setLoggedIn(true);
            }
            setMessage(data["msg"]);
        });
    }

    if (loggedIn) {
        const apiHeaders = {'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token}
        return <Home token={token} apiHeaders={apiHeaders}/>
    }

    return (
        <div className="Auth">
            
            

            <h1>Team Rocket's Blog</h1>
            <div className="Login">
                <h3>Login</h3>
                <p>{message}</p>
                Username:
                <input id="usernameLogin" type="text" onKeyDown={addEnterHandler(handleLogin)}/><br></br>

                Password:
                <input id="passwordLogin" type="password" onKeyDown={addEnterHandler(handleLogin)}/><br></br>
                <br></br>
                <button onClick={handleLogin}>Login</button>
            </div>
            <br></br>
            <div className="SignUp">
            <h3>Sign Up</h3>
                <p>{message}</p>
                Username:
                <input id="usernameSU" type="text" onKeyDown={addEnterHandler(handleSignUp)}/><br></br>

                Password:
                <input id="passwordSU" type="password" onKeyDown={addEnterHandler(handleSignUp)}/><br></br>
                <br></br>
                <button onClick={handleSignUp}>Sign Up</button>
            </div>
            
        </div>
    );
}

export default Auth;