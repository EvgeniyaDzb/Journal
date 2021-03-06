import React, { useEffect, useState } from "react";
import "../styles/Posts.css";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import Box from "../components/UI/box/Box";
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fatchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });

    const [fatchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsById(id);
        setComments(response.data);
    });

    useEffect(() => {
        fatchPostById(params.id);
        fatchComments(params.id)
    }, [])

    return (
        <div className="posts_root">
            <h1>Post {post.id} page</h1>
            {isLoading
                ? <Loader />
                : <Box id={post.id} title={post.title}/>
            }
            <h1>Comments</h1>
            {isComLoading
                ? <Loader />
                : <div>
                    {comments.map(c => 
                        <div key={c.id}>
                        <Box id={c.id} title={c.email} body={c.body}/>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;