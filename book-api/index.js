const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, "db.json");

app.use(express.json());

// Utility: read db.json
function readDB() {
  const data = fs.readFileSync(DB_FILE, "utf8");
  return JSON.parse(data);
}

// Utility: write db.json
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ------------------- CRUD Routes -------------------

// GET /books -> all books
app.get("/books", (req, res) => {
  const db = readDB();
  res.status(200).json(db.books);
});

// GET /books/:id -> single book
app.get("/books/:id", (req, res) => {
  const db = readDB();
  const book = db.books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.status(200).json(book);
});

// POST /books -> create
app.post("/books", (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const db = readDB();
  const newBook = {
    id: db.books.length ? db.books[db.books.length - 1].id + 1 : 1,
    title,
    author,
    year
  };
  db.books.push(newBook);
  writeDB(db);

  res.status(201).json(newBook);
});

// PUT /books/:id -> update
app.put("/books/:id", (req, res) => {
  const { title, author, year } = req.body;
  const db = readDB();
  const book = db.books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (title) book.title = title;
  if (author) book.author = author;
  if (year) book.year = year;

  writeDB(db);
  res.status(200).json(book);
});

// DELETE /books/:id -> delete
app.delete("/books/:id", (req, res) => {
  const db = readDB();
  const index = db.books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  const deleted = db.books.splice(index, 1);
  writeDB(db);

  res.status(200).json({ message: "Deleted", book: deleted[0] });
});

// ------------------- Dynamic Routes -------------------

// GET /books/author/:authorName
app.get("/books/author/:authorName", (req, res) => {
  const db = readDB();
  const author = req.params.authorName.toLowerCase();
  const books = db.books.filter(
    (b) => b.author.toLowerCase() === author
  );

  if (!books.length) {
    return res.status(404).json({
      success: false,
      message: "No books found for this author"
    });
  }
  res.status(200).json(books);
});

// GET /books/year/:year
app.get("/books/year/:year", (req, res) => {
  const db = readDB();
  const year = parseInt(req.params.year);
  const books = db.books.filter((b) => b.year === year);

  if (!books.length) {
    return res.status(404).json({
      success: false,
      message: "No books found for this year"
    });
  }
  res.status(200).json(books);
});

// GET /books/search/:keyword -> case-insensitive search
app.get("/books/search/:keyword", (req, res) => {
  const db = readDB();
  const keyword = req.params.keyword.toLowerCase();
  const books = db.books.filter(
    (b) =>
      b.title.toLowerCase().includes(keyword) ||
      b.author.toLowerCase().includes(keyword)
  );

  if (!books.length) {
    return res.status(404).json({
      success: false,
      message: "No books match your search"
    });
  }
  res.status(200).json(books);
});

// ------------------- Server -------------------
app.listen(PORT, () => {
  console.log(`📚 Book API running on http://localhost:${PORT}`);
});
