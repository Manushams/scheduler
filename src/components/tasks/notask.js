import React from 'react';

const NoTask = ({text, img}) => {
    return(
        <div className="no-task img-empty">
            <h4>{text}</h4>
            <img src={img} alt="no-data"/>
        </div>
    )
}

export default NoTask;