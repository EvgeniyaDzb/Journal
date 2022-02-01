import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "../UI/box/Box";
import MyButton from "../UI/button/MyButton";

const AlbumItem = (props) => {
    const navigate = useNavigate();

    function handleClick(event) {
        event.preventDefault();
        navigate(`/album/${props.album.id}`);
    }
    return (
        <Box id={props.album.id} title={props.album.title} >
            <MyButton onClick={handleClick}>Open</MyButton>
        </Box>
    );

};

export default AlbumItem;