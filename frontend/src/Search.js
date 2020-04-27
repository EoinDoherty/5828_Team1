import React, { useState, useEffect } from 'react';
import Home from './Home';
import Editor from './Editor';

function Search(props) {

    const [home, setHome] = useState(false);
    const [results, setResults] = useState([]);
    const [editorObject, setEditorObject] = useState(undefined);

    function editPost(post) {
        const id = post._id;
        const content = post.content;
        const title = post.title;
        const tags = post.tags;

        setEditorObject(<Editor token={props.token}
                                apiHeaders={props.apiHeaders}
                                title={title}
                                postId={id}
                                content={content}
                                tags={tags}
                                fileContent={post.file}
                                fileName={post.filename}/>);
    }

    function deletePost(postId) {
        fetch("/api/delete_post", {
            method: 'POST',
            headers: props.apiHeaders,
            body: JSON.stringify({"id": postId})
        }).then(_ => 
            fetchPosts()
        );
    }

    function fetchPosts() {
        fetch('/api/search_posts', 
            {method: 'POST',
            headers: props.apiHeaders,
            body: JSON.stringify({"tags": props.tags, "text": props.text})
            }).then(response => {
                if (response.status === 200){
                    response.json().then(data => {
                        setResults(data.results ? data.results : []);
                    })
                }
            });
    }

    function imageContent(post) {
        if(post.file){
            return <img src={post.file.substring(2, post.file.length-1)} alt="No file uploaded"/>
        }
    }

    useEffect(fetchPosts, [props]);

    if (home) {
        return <Home token={props.token} apiHeaders={props.apiHeaders}/>
    }

    if (editorObject) {
        return editorObject;
    }

    const joined_tags = props.tags.join(", ");
    const query_display = props.text.length > 0 ? props.text : joined_tags;

    return (
        <div>
            <h3>Search results for: {query_display}</h3>
            {results.map((result, i) => {
                return (
                    <div className="recentPost" key={"post" + i}>
                        <h3>{result.title}</h3>
                        {imageContent(result)}
                        <button onClick={() => editPost(result)}>Edit</button>
                        <button onClick={() => deletePost(result._id)}>Delete</button>
                    </div>
                );
            })}
            <button onClick={() => setHome(true)}>Home</button>
        </div>
    );
}

export default Search;