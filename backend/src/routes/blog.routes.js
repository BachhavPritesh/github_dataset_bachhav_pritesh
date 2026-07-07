// blog routes — public read endpoints + admin-only write endpoints

const express = require('express');
const verifyJWT   = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const {
  listBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blog.controller');

const router = express.Router();

// ---------- Public Routes ----------
router.get('/',    listBlogs); // GET /blogs
router.get('/:id', getBlog);   // GET /blogs/:id

// ---------- Admin-Only Routes ----------
router.post(  '/',    verifyJWT, requireRole('admin'), createBlog); // POST   /blogs
router.patch( '/:id', verifyJWT, requireRole('admin'), updateBlog); // PATCH  /blogs/:id
router.delete('/:id', verifyJWT, requireRole('admin'), deleteBlog); // DELETE /blogs/:id

module.exports = router;
