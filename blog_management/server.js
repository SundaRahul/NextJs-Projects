const express = require("express");
const blogRoutes = require("./routes/blogRoutes");
const imageRoutes = require("./routes/imageRoutes");
const logger = require("./middlewares/logger");

const app = express();

// Built-in Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware
app.use("/uploads", express.static("uploads"));

// Logger middleware (bonus)
app.use(logger);

// Routes
app.use("/blogs", blogRoutes);
app.use("/images", imageRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
