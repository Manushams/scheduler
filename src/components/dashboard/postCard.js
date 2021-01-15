import React from 'react';

const PostCard = ({task}) => {
    return(
        <div className="post-card">
            <div className="circle"></div>
            <div className="post-details">
                <h3>{task.eventName}</h3>
                <p>{task.timeStart} - {task.timeEnd}</p>
                <div className="dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
        </div>

    )
}
export default PostCard;