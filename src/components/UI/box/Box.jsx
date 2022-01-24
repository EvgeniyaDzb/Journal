import React from "react";
import classes from './Box.module.css';

const Box = (({ children, id, title, body }) => {
    return (
        <div className={classes.post}>
            <div className='post_content'>
                <strong>{id} {title}</strong>
                <div>
                    {body}
                </div>
            </div>
            {children}
        </div>
    );
});

export default Box;