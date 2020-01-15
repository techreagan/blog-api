const express = require('express')
const {
  getComments,
  createComment,
  deleteComment
} = require('../controllers/comments')

const Comment = require('../models/Comment')

const advancedResults = require('../middleware/advancedResults')
const { protect, authorize } = require('../middleware/auth')

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(advancedResults(Comment), getComments)
  .post(createComment)

router.route('/:id').delete(protect, authorize('admin'), deleteComment)

module.exports = router
