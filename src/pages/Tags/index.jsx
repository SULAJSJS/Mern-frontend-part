import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Post } from '../../components';
import styles from './Tags.module.scss';

const Tags = () => {
  const { posts, tags, order } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  console.log('posts', posts);
  const { id } = useParams();

  const newPosts = posts?.items?.filter((obj) =>
    obj.tags.find((name) => name == id) ? posts.items : '',
  );

  const isPostsLoading = posts.status === 'loading';
  return (
    <div className={styles.root}>
      <h1>
        Статьи по тэгу <span>#{id}</span>
      </h1>
      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : newPosts).map((obj, idx) =>
            isPostsLoading ? (
              <Post key={idx} isLoading={true} />
            ) : (
              <Post
                _id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API}${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            ),
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Tags;
