import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import axios from '../../axios';
import { useParams } from 'react-router-dom';

export const AddComment = ({ title, imageUrl, tags, text }) => {
  // const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const { id } = useParams();

  const onUploadComment = async () => {
    try {
      setIsLoading(true);

      const fields = {
        title,
        imageUrl,
        tags,
        comment,
        text,
      };

      const { data } = await axios.patch(`/posts/${id}`, fields);
    } catch (error) {
      console.log(error);
      alert('Ошибка при создании статьи!');
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src="/noavatar.png" />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={onUploadComment} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
