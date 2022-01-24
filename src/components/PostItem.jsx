import React from "react";
import '../styles/PostItem.css'
import MyButton from "./UI/button/MyButton";
import {useNavigate} from 'react-router-dom';

const PostItem = (props) => {
  const navigate  = useNavigate();

   function handleClick(event) {
    event.preventDefault();
    navigate(`/posts/${props.post.id}`);
  }
    return(
<div className='post'>
      <div className='post_content'>
        <strong>{props.post.id} {props.post.title}</strong>
        <div>
          {props.post.body}
        </div>
      </div>
      <div className='post_btns'>
      <MyButton onClick={handleClick}>Open</MyButton>
        <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
      </div>
    </div>
    );
};

export default PostItem;