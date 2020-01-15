const express = require('express')
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/posts')

const Post = require('../models/Post')

const advancedResults = require('../middleware/advancedResults')
const { protect, authorize } = require('../middleware/auth')

const commentRoutes = require('./comments')

const router = express.Router()

router.use('/:id/comments', commentRoutes)

router
  .route('/')
  .get(advancedResults(Post, 'comments'), getPosts)
  .post(protect, createPost)

router
  .route('/:id')
  .get(getPost)
  .put(protect, authorize('guest', 'admin'), updatePost)
  .delete(protect, authorize('admin'), deletePost)

module.exports = router
