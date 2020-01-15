const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Comment = require('../models/Comment')
const Post = require('../models/Post')

// @desc    Get comments by post
// @route   GET /api/v1/posts/:id/comments
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Create comment
// @route   POST /api/v1/posts/:id/comments
// @access  Private
exports.createComment = asyncHandler(async (req, res, next) => {
  const { name, body } = req.body
  const { id } = req.params

  const post = await Post.findById(id)
  if (!post)
    return next(new ErrorResponse(`Post not found with id of ${id}`, 404))

  const comment = await Comment.create({
    name,
    body,
    post: id
  })

  res.status(201).json({ success: true, data: comment })
})

// @desc    Delete Comment
// @route   DELETE /api/v1/comments/:id
// @access  Private (admin)
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const id = req.params.id

  const comment = await Comment.findByIdAndDelete(id)

  if (!comment) {
    return new ErrorResponse(`Comment with id ${id} not found`, 404)
  }

  res.status(200).json({ success: true, data: {} })
})
