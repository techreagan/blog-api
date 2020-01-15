const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Post = require('../models/Post')

// @desc    Get all posts
// @route   GET /api/v1/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single post
// @route   GET /api/v1/posts/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)

  if (!post)
    return next(
      new ErrorResponse(`Post with ID of ${req.params.id} not found`, 404)
    )

  res.status(200).json({ success: true, data: post })
})

// @desc    Create post
// @route   POST /api/v1/posts
// @access  Private
exports.createPost = asyncHandler(async (req, res, next) => {
  const { title, body, banner_image } = req.body

  const post = await Post.create({
    title,
    body,
    banner_image,
    user: req.user.id
  })

  res.status(201).json({ success: true, data: post })
})

// @desc    Update Post
// @route   PUT /api/v1/posts/:id
// @access  Private (admin, guest)
exports.updatePost = asyncHandler(async (req, res, next) => {
  const id = req.params.id

  const post = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })

  if (!post) {
    return next(new ErrorResponse(`Post with id ${id} not found`, 404))
  }

  res.status(200).json({ success: true, data: post })
})

// @desc    Delete Post
// @route   DELETE /api/v1/posts/:ID
// @access  Private (admin)
exports.deletePost = asyncHandler(async (req, res, next) => {
  const id = req.params.id

  const post = await Post.findById(id)

  if (!post) return next(new ErrorResponse(`Post with id ${id} not found`, 404))

  post.remove()

  res.status(200).json({ success: true, data: {} })
})

// @desc    Upload banner image for post
// @route   PUT /api/v1/post/:id/banner
// @access  Private
exports.postBannerUpload = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    return next(
      new ErrorReponse(`Post not found with id of ${req.params.id}`, 404)
    )
  }

  if (!req.files) {
    return next(new ErrorReponse(`Please upload a file`, 404))
  }

  const file = req.files.file

  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorReponse(`Please upload an image file`, 404))
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorReponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD /
          1000 /
          1000}mb`,
        404
      )
    )
  }

  file.name = `photo_${post._id}${path.parse(file.name).ext}`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err)
      return next(new ErrorReponse(`Problem with file upload`, 500))
    }

    await Post.findByIdAndUpdate(req.params.id, { banner_image: file.name })

    res.status(200).json({ success: true, data: file.name })
  })
})
