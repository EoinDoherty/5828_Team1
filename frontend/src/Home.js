import React, { useState, useEffect } from 'react';
import Card from './Card.js'
import Editor from './Editor';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Home.css';


function Home (props) {

    const [editorObj, setEditorObj] = useState(undefined);
    const [username, setUsername] = useState("");
    const [datePosts, setDatePosts] = useState([]);

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

    const [status, setStatus] = useState(404);
    const [posts, setPosts] = useState([]);


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

    const [date, setDate] = useState(undefined);

    const onChange = date => {
        setDate(date);
    };

    function onClickDay(date) {
        // Fetch from API here
        console.log("Clicked: " + date);
        console.log(date);
        
        const requestOptions = {
            method: 'POST',
            headers: props.apiHeaders,
            body: JSON.stringify({
            "date": date
            })
        }

        fetch('api/list_posts_by_date', requestOptions)
            .then(response => {
                console.log(response);
                response.json().then(data => setDatePosts(data.posts))
            })
    }

    function postListing(post) {
        return (

            <div className="recentPost">

                    <Card className='CardEditor' style={{ marginBottom: '20px', padding: '20px', boxSizing: 'border-box' }}>   
                    <h3>{post.title}</h3>
                
                    <button onClick={() => editExisting(post)}>Edit</button>
                    <button onClick={() => deletePost(post._id)}>Delete</button>
                <br></br>
                </Card>
            </div>
        );
    }

    if (status === 200) {
        if (editorObj !== undefined) {
            return <div className = 'Home'>{editorObj}</div>
        }
        return (
            <div className = 'Home'>
        <Card style={{ marginBottom: '20px', padding: '20px', boxSizing: 'border-box' }}>
                <div className="cardHeader">
                    <h3>Hello {username}</h3>
                    <br></br>
                    <span>Recent Posts</span>
                </div>

                <div className="recentPosts">
                    { posts.map(postListing) }
                    <button onClick={openEditor}>New Post</button>
                </div>

            </Card>
            <div>
                <h3>Find a post by date</h3>
                
                <Calendar  id="calendar" onChange={onChange} value={date} onClickDay={onClickDay}/> 
                {date && <div><h3>Posts for {date.toLocaleDateString('en-US')}</h3></div>}
                {datePosts.length > 0 && datePosts.map(postListing)}
            </div>
        </div>);
    }

    return (
        <div className = 'Home'>
            <h3>Error</h3>
            <p>{status}</p>
        </div>
    );

  

}

export default Home;