import React, { useState } from 'react';

function Home (props) {

    const token = props["token"];

    const [status, setStatus] = useState(404);
    const [message, setMessage] = useState("Unable to connect to backend server");

    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token}
    };

    fetch('api/home', requestOptions)
        .then(response => {
            setStatus(response.status);
            return response.json()})
        .then(data => setMessage(data["msg"]));
    
    // Should probably redirect to login screen instead an error happens
    let headerText = "Error";
    let bodyText = message;

    if (status === 200) {
        headerText = "Success!";
        bodyText = "Private data pulled from server: " + message;
    }

    return (
        <div>
            <h3>{headerText}</h3>
            <p>{bodyText}</p>
        </div>
    );
}

export default Home;