import React, { useState, useEffect } from 'react';
import Editor from './Editor';

function Home (props) {

    const [editorObj, setEditorObj] = useState(undefined);
    const [username, setUsername] = useState("");

    useEffect(() => {
        let options = {method: 'GET', headers: props.apiHeaders};
        fetch("/api/get_username", options)
            .then(response => {
                response.json().then(data => 
                    setUsername(data.msg)
                );
            })
        },
    [props.apiHeaders]);

    function openEditor() {
        setEditorObj(<Editor token={props["token"]} apiHeaders={props["apiHeaders"]}></Editor>);
    }

    function editExisting(post) {
        setEditorObj(<Editor token={props["token"]} 
                             apiHeaders={props["apiHeaders"]} 
                             title={post.title} 
                             content={post.content} 
                             postId={post._id}
                             fileContent={post.file}
                             fileName={post.filename}>
                    </Editor>)
    }

    function deletePost(postId) {
        fetch("/api/delete_post", {
            method: 'POST',
            headers: props.apiHeaders,
            body: JSON.stringify({"id": postId})
        }).then(request => 
            fetchPosts()
        );
    }

    // const apiHeaders = props["apiHeaders"];

    const [status, setStatus] = useState(404);
    // const [message, setMessage] = useState("Unable to connect to backend server");
    const [posts, setPosts] = useState([]);

    // fetch('api/home', requestOptions)
    //     .then(response => {
    //         setStatus(response.status);
    //         return response.json()})
    //     .then(data => setMessage(data["msg"]));

    function fetchPosts() {
        const requestOptions = {
            method: 'GET',
            headers: props.apiHeaders
        }
        fetch('api/list_posts', requestOptions)
            .then(response => {
                setStatus(response.status);
                response.json()
                .then(data =>
                    setPosts(data.posts)
                )
            })
    }

    useEffect(fetchPosts, [props.apiHeaders]);

    if (status === 200) {
        if (editorObj !== undefined) {
            return <div>{editorObj}</div>
        }
        return (
            <div>
                <h3>Hello {username}</h3>
                <h3>Posts:</h3>
                <ul>
                    {posts.map((post, index) => 
                        <div key={index}  post-id={post["_id"]}>
                            <li>
                                {post.title}
                                <button onClick={() => editExisting(post)}>Edit</button>
                                <button onClick={() => deletePost(post._id)}>Delete</button>
                            </li>
                        </div>
                    )}
                </ul>
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