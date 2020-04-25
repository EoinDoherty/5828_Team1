import React, { useState, useEffect } from 'react';
import NavLink from 'react-dom';
import Card from './Card.js'
import Editor from './Editor';
import CustomCalendar from './CustomCalendar'

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
                             postId={post._id}>
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
        <Card style={{ marginBottom: '20px', padding: '20px', boxSizing: 'border-box' }}>
                <div className="cardHeader">
                    <span>Hello {username}</span>
                    <br></br>
                    <span>Recent Posts</span>
                </div>

                <div className="recentPosts">

                    {
                        posts.map(post => {
                            return (
                                <div className="recentPost">
                                        <h3>{post.title}</h3>
                                        <span>{post.content}</span>
                                    
                                        <button onClick={() => editExisting(post)}>Edit</button>
                                        <button onClick={() => deletePost(post._id)}>Delete</button>
                                    <br></br>
                                </div>
                            );
                        })
                    }
                    <button onClick={openEditor}>New Post</button>
                </div>

            </Card>
            <CustomCalendar></CustomCalendar>
        </div>);

        //     <div>
        //         <h3>Hello {username}</h3>
        //         <h3>Posts:</h3>
        //         <ul>
        //             {posts.map((post, index) => 
        //                 <div key={index}  post-id={post["_id"]}>
        //                     <li>
        //                         {post.title}
        //                         <button onClick={() => editExisting(post)}>Edit</button>
        //                         <button onClick={() => deletePost(post._id)}>Delete</button>
        //                     </li>
        //                 </div>
        //             )}
        //         </ul>
        //         <button onClick={openEditor}>Create a new post</button>
        //     </div>
        // );
    }

    return (
        <div>
            <h3>Error</h3>
            <p>{status}</p>
        </div>
    );
}

export default Home;

// import React, { useState, useEffect } from 'react';
// import NavLink from 'react-dom';
// import Card from './Card.js'

// function Home(props) {

//     const [posts, setPosts] = useState([]);
//     const [status, setStatus] = useState(404);

//     function fetchPosts() {
//         const requestOptions = {
//             method: 'GET',
//             headers: props.apiHeaders
//         }
//         fetch('api/list_posts', requestOptions)
//             .then(response => {
//                 setStatus(response.status);
//                 response.json()
//                 .then(data =>
//                     setPosts(data.posts)
//                 )
//             })
//     }

//     useEffect(fetchPosts, [props.apiHeaders]);

//     return (
//         <div>
//         <Card style={{ marginBottom: '20px', padding: '20px', boxSizing: 'border-box' }}>
//                 <div className="cardHeader">
//                     <span>Recent Posts</span>
//                 </div>

//                 <div className="recentPosts">

//                     {
//                         posts.map(post => {
//                             return (
//                                 <NavLink>
//                                     <div className="recentPost">
//                                         <h3>{post.title}</h3>
//                                         <span>{post.content}</span>
//                                     </div>
//                                 </NavLink>
                                
//                             );
//                         })
//                     }
//                 </div>

//             </Card>
//         </div>);
// }

// export default Home