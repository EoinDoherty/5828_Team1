import React, {useState} from 'react';
import Home from './Home';

function Editor (props) {

    const apiHeaders = props["apiHeaders"];
    let [postId, setPostId] = useState(props.postId);
    let [exit, setExit] = useState(false);

    function savePost() {
        const title = document.getElementById("post-title").value;
        const content = document.getElementById("post-editor").value;
        
        if (postId) {
            // Overwrite an existing post
            fetch("/api/update_post", {
                method: 'POST',
                headers: apiHeaders,
                body: JSON.stringify({
                    "title": title,
                    "content": content,
                    "id": postId
                })
            })
        } else {
            // Create a new post
            fetch("/api/new_post", {
                method: 'POST',
                headers: apiHeaders,
                body: JSON.stringify({
                    "title": title,
                    "content": content
                })
            }).then(response => {
                if (response.status === 200) {
                    response.json()
                        .then(data => 
                            setPostId(data.id)
                    )
                }
            })
        }
    }

    function goHome() {
        setExit(true);
    }

    let title = props.title ? props.title : "";
    let content = props.content ? props.content : "";

    if (exit) {
        return <Home token={props.token} apiHeaders={props.apiHeaders}/>
    }

    return (
        <div className="editor">
            <h3>Title:</h3>
            <input type="text" id="post-title" name="title" defaultValue={title}></input>
            <br></br>
            <h3>Content:</h3>
            <textarea id="post-editor" rows="5" cols="100" defaultValue={content}></textarea>
            <br></br>
            <button id="save-post" onClick={savePost}>Save</button>
            <br></br>
            <button id="home-btn" onClick={goHome}>Home</button>
        </div>
    )

}

export default Editor;