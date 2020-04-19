import React, { useState } from 'react';
import Auth from './Auth'
import Editor from './Editor';

function Home (props) {

    const [editorObj, setEditorObj] = useState(undefined);

    function openEditor() {
        setEditorObj(<Editor token={props["tokens"]} apiHeaders={apiHeaders}></Editor>);
    }

    const apiHeaders = props["apiHeaders"];

    const [status, setStatus] = useState(404);
    const [message, setMessage] = useState("Unable to connect to backend server");

    const requestOptions = {
        method: 'GET',
        headers: apiHeaders
    };

    fetch('api/home', requestOptions)
        .then(response => {
            setStatus(response.status);
            return response.json()})
        .then(data => setMessage(data["msg"]));

    if (status === 200) {
        if (editorObj !== undefined) {
            console.log("ok")
            return <div>{editorObj}</div>
        }
        return (
            <div>
                <h3>Success!</h3>
                <h3>Posts:</h3>
                {/* TODO: Put post list from api here */}
                <button onClick={openEditor}>Create a new post</button>
            </div>
        );
    }

    return (
        <div>
            <h3>Error</h3>
            <p>{status}</p>
        </div>
    );
}

export default Home;