import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PostService from '../API/PostService';
import PostFilter from '../components/Posts/PostFilter';
import PostForm from '../components/Posts/PostForm';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/loader/Loader';
import MyModal from '../components/UI/modal/MyModal';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from "../hooks/useObserver";
import { usePosts } from '../hooks/usePosts';
import { getPageCount } from '../utils/pages';
import "../styles/Posts.css";
import AnimatedList from "../components/UI/list/AnimatedList";
import PostItem from "../components/Posts/PostItem";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createNewPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const navigate = useNavigate();

    return (
        <div className="posts_root">
            <MyButton onClick={() => setModal(true)}>
                Add Post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createNewPost} />
            </MyModal>
            <hr style={{ margin: '15px 8' }} />
            <PostFilter filter={filter} setFilter={setFilter} />
           
            {postError && navigate(`/error`)}
            
            <AnimatedList title="The list of posts" items={sortedAndSearchPosts} render={(item, index) => {
                return <PostItem number={index + 1} post={item} remove={removePost}/>
            }}/>
                
            <div ref={lastElement} style={{height: 30}}/> 

            {isPostsLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader/></div>
            }
        </div>
    );
};

export default Posts;