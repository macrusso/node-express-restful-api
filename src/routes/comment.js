import express from 'express';
import {
  createComment,
  getComments,
  deleteComment,
  updateComment,
} from '../controllers/comment';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getComments)
  .post(createComment);

router
  .route('/:comment_id')
  .patch(updateComment)
  .delete(deleteComment);

export default router;
