const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Post = require('../models/Post')

// @desc    Get all posts
// @route   GET /api/v1/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})
