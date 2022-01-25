import React, { useEffect, useState, useRef } from "react";
import PostService from '../API/PostService';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/loader/Loader';
import MyModal from '../components/UI/modal/MyModal';
import Pagination from '../components/UI/pagination/Pagination';
import MySelect from "../components/UI/select/MySelect";
import { useFetching } from '../hooks/useFetching';
import { useObserver } from "../hooks/useObserver";
import { usePosts } from '../hooks/usePosts';
import { getPageCount } from '../utils/pages';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit))
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


    const changePage = (page) => {
        setPage(page);
    }
    return (
        <div>
            <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
                Add Post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createNewPost} />
            </MyModal>
            <hr style={{ margin: '15px 8' }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            {/* <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Number of items per page'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Show all'},
                ]}

            /> */}
            {postError &&
                <h1>An error has occurred ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchPosts} title="The list of posts" />
            
            {isPostsLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>
            }

            <div ref={lastElement}/>
            
            {/* <Pagination
                totalPages={totalPages}
                page={page}
                changePage={changePage}
            /> */}
        </div>
    );
};

export default Posts;