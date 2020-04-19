import React from 'react';
import Home from './Home';

function Editor (props) {

    const apiHeaders = props["apiHeaders"];

    function savePost() {
        const title = document.getElementById("post-title").value;
        const content = document.getElementById("post-editor").value;

        console.log(title);
        console.log(content);
        
        const update_obj = {
            "title": title,
            "content": content
        };
        
        // Send object here

    }

    function goHome() {
        console.log("Get out of here");
    }

    return (
        <div className="editor">
            <h3>Title:</h3>
            <input type="text" id="post-title" name="title"></input>
            <br></br>
            <h3>Content:</h3>
            <textarea id="post-editor" rows="5" cols="100"></textarea>
            <br></br>
            <button id="save-post" onClick={savePost}>Save</button>
            <br></br>
            <button id="home-btn" onClick={goHome}>Home</button>
        </div>
    )

}

export default Editor;