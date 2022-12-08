import Container from '@mui/material/Container';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import Tags from './pages/Tags';
import { fetchAuthMe } from './store/slices/auth';
import { fetchPosts, fetchTagses } from './store/slices/posts';

function App() {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.posts);
  const isAuth = useSelector((state) => Boolean(state.auth.data));

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  React.useEffect(() => {
    dispatch(fetchPosts(order));
    dispatch(fetchTagses());
  }, [order]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/tags/:id" element={<Tags />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
