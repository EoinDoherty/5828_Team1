import React, { useState, useEffect } from 'react';
import Home from './Home';

function Editor (props) {

    const apiHeaders = props["apiHeaders"];
    let [postId, setPostId] = useState(props.postId);
    let [exit, setExit] = useState(false);

    useEffect(() => {
        var fileContent = props.fileContent;
        if(typeof fileContent != 'undefined')
            loadPreview(props.fileName, fileContent.substring(2, fileContent.length-1));
        },
    [props.fileName, props.fileContent]);

    let title = props.title ? props.title : "";
    let content = props.content ? props.content : "";
    let filename = props.fileName ? props.fileName : ""
    let fileContent = props.fileContent ? props.fileContent : ""

    function loadPreview(name, fileContent)
    {
        var preview = document.getElementById('preview');
        if(preview.childNodes.length > 0)
            preview.removeChild(preview.childNodes[0]);
        var image = new Image();
        image.height = 100;
        image.title = name;
        image.src = fileContent;
        preview.appendChild(image);
    }

    function processImage(fileContent, data)
    {
        var reader = new FileReader();
        reader.readAsDataURL(fileContent);
        reader.onload = function(){
            var result = reader.result
            fetch("/api/upload_image/"+data.id, {
                method: 'POST',
                headers: apiHeaders,
                body: result
            })

            loadPreview(fileContent.name, result);
        }
    }

    function savePost() {
        const title = document.getElementById("post-title").value;
        const content = document.getElementById("post-editor").value;
        const uploadFile = document.getElementById("image-upload").files[0];
        fileContent = uploadFile ? uploadFile : fileContent;
        filename = uploadFile.name ? uploadFile.name : filename;
        
        if (postId) {
            // Overwrite an existing post
            fetch("/api/update_post", {
                method: 'POST',
                headers: apiHeaders,
                body: JSON.stringify({
                    "title": title,
                    "content": content,
                    "id": postId,
                    "filename": filename
                })
            }).then(response => {
                if (response.status === 200) {
                    response.json()
                        .then(data => {
                            processImage(fileContent, data);
                        })
                }
            })
        } else {
            // Create a new post
            fetch("/api/new_post", {
                method: 'POST',
                headers: apiHeaders,
                body: JSON.stringify({
                    "title": title,
                    "content": content,
                    "filename": filename
                })
            }).then(response => {
                if (response.status === 200) {
                    response.json()
                        .then(data => {
                            setPostId(data.id);
                            processImage(fileContent, data);
                        }
                )}
            })
        }
    }

    function goHome() {
        setExit(true);
    }


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
            <input type="file" id="image-upload"></input>
            <button id="home-btn" onClick={goHome}>Home</button>
            <div id="preview"/>
        </div>
    )
}

export default Editor;