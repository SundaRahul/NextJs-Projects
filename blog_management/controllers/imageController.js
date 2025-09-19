const path = require("path");
const fs = require("fs");

const getImage = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "..", "uploads", filename);

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  } else {
    return res.status(404).json({ message: "Image not found" });
  }
};

module.exports = { getImage };
