import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTagses = createAsyncThunk('tags/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});
export const fetchRemovePost = createAsyncThunk('tags/fetchTags', async (id) => {
  await axios.delete(`/posts/${id}`);
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducer: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
  },
  extraReducers: {
    // Get Posts
    [fetchPosts.fulfilled.type]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'success';
    },
    [fetchPosts.pending.type]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.rejected.type]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    // Get Tags
    [fetchTagses.fulfilled.type]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'success';
    },
    [fetchTagses.pending.type]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTagses.rejected.type]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },

    // Delete post
    [fetchRemovePost.pending.type]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
