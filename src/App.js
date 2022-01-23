import React, { useEffect, useState } from 'react';
import PostService from './API/PostService';
import './App.css';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import Loader from './components/UI/loader/Loader';
import MyModal from './components/UI/modal/MyModal';
import { usePosts } from './hooks/usePosts';



function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  useEffect(()=>{
    fetchPosts()
  },[])

  const createNewPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  async function fetchPosts() {
    setIsPostsLoading(true);
    const posts = await PostService.getAll();
    setPosts(posts)
    setIsPostsLoading(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
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
      {isPostsLoading
        ?
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchPosts} title="The list of posts" />
      }

    </div>
  );
}

export default App;
