import React from "react";
import './styles/PostItem.css'
import MyButton from "../UI/button/MyButton";
import { useNavigate } from 'react-router-dom';
import Box from "../UI/box/Box";

const PostItem = (props) => {
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    navigate(`/post/${props.post.id}`);
  }
  return (
    <div>
      <Box id={props.post.id} title={props.post.title} body={props.post.body}>
        <div className='post_btns'>
          <MyButton onClick={handleClick}>Open</MyButton>
          <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
        </div>
      </Box>

    </div>
  );
};

export default PostItem;