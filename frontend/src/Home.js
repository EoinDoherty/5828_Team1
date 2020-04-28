import React, { useState, useEffect } from 'react';
import Card from './Card.js'
import Editor from './Editor';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Search from './Search.js';
import './Home.css';

function Home (props) {

    const [editorObj, setEditorObj] = useState(undefined);
    const [username, setUsername] = useState("");
    const [datePosts, setDatePosts] = useState([]);
    const [searchTag, setSearchTag] = useState("");
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        let options = {method: 'GET', headers: props.apiHeaders};
        fetch("/api/get_username", options)
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => 
                        setUsername(data.msg)
                    );
                }
            })
        },
    [props.apiHeaders]);

    function openEditor() {
        setEditorObj(<Editor token={props["token"]} apiHeaders={props["apiHeaders"]}></Editor>);
    }

    function editExisting(post) {
        const tags = post.tags ? post.tags : [];

        setEditorObj(<Editor token={props["token"]} 
                             apiHeaders={props["apiHeaders"]} 
                             title={post.title} 
                             content={post.content} 
                             postId={post._id}
                             tags={tags}
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


    // const [status, setStatus] = useState(404);
    const [posts, setPosts] = useState([]);

    function fetchPosts() {
        const requestOptions = {
            method: 'GET',
            headers: props.apiHeaders
        }
        fetch('api/list_posts', requestOptions)
            .then(response => {
                if (response.status === 200){
                    response.json().then(data => setPosts(data.posts))
                }
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
                if (response.status === 200){
                    response.json().then(data => setDatePosts(data.posts));
                }
            })
    }


    function imageContent(post) {
        if(post.file){
            return <img src={post.file.substring(2, post.file.length-1)} alt="No file uploaded"/>
        }
    }
    

    function postListing(post, i) {
        const tags = post.tags? post.tags : [];

        return (
            <div className="recentPost" key={"post-listing-" + i}>

                    <Card className='CardEditor' style={{ marginBottom: '10px', padding: '10px' }}>  
                    <div className = "Title">
                    <h5>{post.title}</h5> </div>       
                    <br/>
                    {imageContent(post)}
                    {/* <span>Tags: </span> */}
                    <div className = "Tag">
                    <h5>Tag:</h5>
                    {tags.map((tag, i) => {
                        return <button key={"tag=" + i} onClick={() => setSearchTag(tag)}>{tag}</button>
                    })}
                    </div>
                <br></br>
                    <div class ="btn-group">
                    <button onClick={() => editExisting(post)}>Edit</button>

                    <button onClick={() => deletePost(post._id)}>Delete</button>
                    <br></br>
                    </div>
                </Card>
            </div>
        );
    }
    
    function submitSearch() {
        const search_text = document.getElementById("searchbar").value;
        
        if (search_text.length > 0) {
            setSearchText(search_text);
        }
    }

    if (searchTag.length > 0 || searchText.length > 0) {
        return <Search token={props.token} 
                        apiHeaders={props.apiHeaders} 
                        tags={[searchTag]} 
                        text={searchText}/>
    }
    if (editorObj !== undefined) {
        return editorObj;
    }
    return (
        <div className = 'Home'>
    {/* <Card style={{ marginBottom: '20px', padding: '20px', boxSizing: 'border-box' }}> */}
            <div className="cardHeader">
                <h3>Welcome {username}</h3>
                <br></br>
                <input id="searchbar" type="text"></input>
                <button id="searchbar-btn" onClick={submitSearch}>Search</button>
                <br></br>
                <br></br>
                <span>Recent Posts</span>
            </div>

            <div className="recentPosts">
                { posts.map(postListing) }
                <button onClick={openEditor}>New Post</button>
            </div>

        {/* </Card> */}
        <div className ="FindPost">
            <h3>Find a post by date</h3>
            
            <Calendar   id="calendar" onChange={onChange} value={date} onClickDay={onClickDay}/> 
            {date && <div><h3>Posts for {date.toLocaleDateString('en-US')}</h3></div>}
            {datePosts.length > 0 && datePosts.map(postListing)}
        </div>
    </div>);

    // return (
    //     <div className = 'Home'>
    //         <h3>Error</h3>
    //         <p>{status}</p>
    //     </div>
    // );

  

}

export default Home;