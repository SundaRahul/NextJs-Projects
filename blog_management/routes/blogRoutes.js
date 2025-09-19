const express = require("express");
const multer = require("multer");
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlogById,
  deleteBlogById
} = require("../controllers/blogController");

const validateBlog = require("../middlewares/validateBlog");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  }
});
const upload = multer({ storage });

router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/create", upload.single("image"), validateBlog, createBlog);
router.put("/:id", upload.single("image"), updateBlogById);
router.delete("/:id", deleteBlogById);

module.exports = router;
