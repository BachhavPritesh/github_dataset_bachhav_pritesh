// blog controller — handles CRUD operations for blog posts
// Public: GET /blogs (list), GET /blogs/:id (single)
// Admin:  POST /blogs (create), PATCH /blogs/:id (update), DELETE /blogs/:id (delete)

const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const Blog = require('../models/Blog.model');

// GET /blogs — return all published blog posts, newest first
const listBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ published: true })
    .sort({ createdAt: -1 })
    .select('-content'); // exclude full content from listing for performance
  successResponse(res, 'Blogs fetched successfully', blogs);
});

// GET /blogs/:id — return a single blog post with full content
const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog || !blog.published) return errorResponse(res, 'Blog not found', null, 404);
  successResponse(res, 'Blog fetched successfully', blog);
});

// POST /blogs — create a new blog post (admin only)
const createBlog = asyncHandler(async (req, res) => {
  const { title, excerpt, content, tags, image } = req.body;

  if (!title || !excerpt || !content) {
    return errorResponse(res, 'title, excerpt and content are required', null, 400);
  }

  const blog = await Blog.create({
    title,
    excerpt,
    content,
    tags: tags || [],
    image: image || null,
    author: req.user.name || 'Admin',  // name from JWT payload if available
    authorId: req.user.id,
  });

  successResponse(res, 'Blog created successfully', blog, null, 201);
});

// PATCH /blogs/:id — update an existing blog post (admin only)
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true },
  );
  if (!blog) return errorResponse(res, 'Blog not found', null, 404);
  successResponse(res, 'Blog updated successfully', blog);
});

// DELETE /blogs/:id — permanently delete a blog post (admin only)
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return errorResponse(res, 'Blog not found', null, 404);
  successResponse(res, 'Blog deleted successfully');
});

module.exports = { listBlogs, getBlog, createBlog, updateBlog, deleteBlog };
