import React, { useEffect, useState } from 'react';
import PostService from './API/PostService';
import './App.css';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import Loader from './components/UI/loader/Loader';
import MyModal from './components/UI/modal/MyModal';
import Pagination from './components/UI/pagination/Pagination';
import { useFetching } from './hooks/useFetching';
import { usePosts } from './hooks/usePosts';
import { getPageCount } from './utils/pages';



function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit))
  });



  useEffect(() => {
    fetchPosts(limit, page)
  }, [])

  const createNewPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }


  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page)
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
        Add Post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createNewPost} />
      </MyModal>
      <hr style={{ margin: '15px 8' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError &&
        <h1>An error has occurred ${postError}</h1>
      }
      {isPostsLoading
        ?
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchPosts} title="The list of posts" />
      }
      <Pagination
        totalPages={totalPages}
        page={page}
        changePage={changePage} 
      />
    </div>
  );
}

export default App;
