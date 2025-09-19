const {
  getAllBlogs,
  getBlogById,
  addBlog,
  updateBlog,
  deleteBlog
} = require("../models/blogModel");

const getBlogs = (req, res) => {
  let blogs = getAllBlogs();

  // Bonus: search
  const { search, page, limit } = req.query;

  if (search) {
    blogs = blogs.filter(blog =>
      blog.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Bonus: pagination
  if (page && limit) {
    const start = (parseInt(page) - 1) * parseInt(limit);
    const end = start + parseInt(limit);
    blogs = blogs.slice(start, end);
  }

  res.json(blogs);
};

const getBlog = (req, res) => {
  const id = parseInt(req.params.id);
  const blog = getBlogById(id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
};

const createBlog = (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.filename : null;
  const blog = addBlog({ title, content, image });
  res.status(201).json(blog);
};

const updateBlogById = (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  if (req.file) data.image = req.file.filename;
  const updated = updateBlog(id, data);
  if (!updated) return res.status(404).json({ message: "Blog not found" });
  res.json(updated);
};

const deleteBlogById = (req, res) => {
  const id = parseInt(req.params.id);
  const success = deleteBlog(id);
  if (!success) return res.status(404).json({ message: "Blog not found" });
  res.json({ message: "Blog deleted" });
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlogById,
  deleteBlogById
};
