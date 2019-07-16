import React from 'react';
const Comment = (props) => {
    return (
        <div className="row mt-2 mb-2 p-2 rounded" >
            <div className="col-3">
                <img src={props.authorURL} style={{ borderRadius: '50%', height: '7vh', border: '1px solid black' }} />
            </div>
            <div className="col-9 text-left">
                <h5>{props.author}</h5>
                <p> {props.content} </p>
            </div>
        </div>
    )
}

export default Comment;