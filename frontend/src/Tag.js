import React from 'react'

function Tag(props) {
    return (
        <span className="editableTag">
            <button onClick={props.onClick}>{props.children}</button>
            <button className="deleteTagBtn" onClick={props.onDelete}>X</button>
        </span>
    )
}

export default Tag;