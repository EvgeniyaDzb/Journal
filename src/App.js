import React, { useState } from 'react';
import './App.css';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/modal/MyModal';
import { usePosts } from './hooks/usePosts';



function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'Description1' },
    { id: 2, title: 'Java', body: 'Description2' },
    { id: 3, title: 'C#', body: 'Description3' },
    { id: 4, title: 'Pyton', body: 'Description4' },
  ]);

  const [filter, setFilter] = useState({ sort: '', query: '' })

  const [modal, setModal] = useState(false)

  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

  const createNewPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
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
      <PostList remove={removePost} posts={sortedAndSearchPosts} title="The list of posts" />
    </div>
  );
}

export default App;
