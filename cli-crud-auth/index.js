#!/usr/bin/env node

const fs = require("fs").default;
const path = require("path");

// Get CLI arguments
const [,, command, fileName, arg1, arg2] = process.argv;

// Utility: get full file path
const getFilePath = (name) => path.join(__dirname, name);

// Utility: read file safely
const readFileLines = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath, "utf8").split("\n").filter(Boolean);
};

// ---------------- CRUD FUNCTIONS ----------------

// READ (print file content with line numbers)
function readFile(file) {
  const filePath = getFilePath(file);
  const lines = readFileLines(filePath);
  if (!lines) {
    console.log(`No file found: ${file}`);
    return;
  }
  lines.forEach((line, idx) => {
    console.log(`${idx + 1}. ${line}`);
  });
}

// LIST (alias of read with count)
function listFile(file) {
  const filePath = getFilePath(file);
  const lines = readFileLines(filePath);
  if (!lines) {
    console.log(`No file found: ${file}`);
    return;
  }
  lines.forEach((line, idx) => {
    console.log(`${idx + 1}. ${line}`);
  });
  console.log(`Total records: ${lines.length}`);
}

// CREATE (append new record)
function createRecord(file, text) {
  const filePath = getFilePath(file);
  const lines = readFileLines(filePath) || [];
  lines.push(text);
  fs.writeFileSync(filePath, lines.join("\n") + "\n");
  console.log(`Created record #${lines.length}`);
}

// UPDATE (replace record by line number)
function updateRecord(file, lineNumber, newText) {
  const filePath = getFilePath(file);
  const lines = readFileLines(filePath);
  if (!lines || lineNumber < 1 || lineNumber > lines.length) {
    console.log(`Invalid line number: ${lineNumber}`);
    return;
  }
  lines[lineNumber - 1] = newText;
  fs.writeFileSync(filePath, lines.join("\n") + "\n");
  console.log(`Updated record #${lineNumber}`);
}

// DELETE (remove record by line number)
function deleteRecord(file, lineNumber) {
  const filePath = getFilePath(file);
  const lines = readFileLines(filePath);
  if (!lines || lineNumber < 1 || lineNumber > lines.length) {
    console.log(`Invalid line number: ${lineNumber}`);
    return;
  }
  lines.splice(lineNumber - 1, 1);
  fs.writeFileSync(filePath, lines.join("\n") + (lines.length ? "\n" : ""));
  console.log(`Deleted record #${lineNumber}`);
}

// ---------------- AUTH FUNCTIONS ----------------

// REGISTER
function registerUser(email, password) {
  const filePath = getFilePath("users.txt");
  const lines = readFileLines(filePath) || [];

  // Check if user exists
  const exists = lines.some((line) => {
    try {
      const user = JSON.parse(line);
      return user.email === email;
    } catch {
      return false;
    }
  });

  if (exists) {
    console.log("User already exists");
    process.exit(1);
  }

  const newUser = JSON.stringify({ email, password });
  fs.appendFileSync(filePath, newUser + "\n");
  console.log(`Registered ${email}`);
}

// LOGIN
function loginUser(email, password) {
  const filePath = getFilePath("users.txt");
  const lines = readFileLines(filePath);
  if (!lines) {
    console.log("No users registered");
    process.exit(1);
  }

  const valid = lines.some((line) => {
    try {
      const user = JSON.parse(line);
      return user.email === email && user.password === password;
    } catch {
      return false;
    }
  });

  if (valid) {
    console.log("Login successful");
    process.exit(0);
  } else {
    console.log("Invalid credentials");
    process.exit(1);
  }
}

// ---------------- COMMAND ROUTER ----------------

switch (command) {
  case "read":
    readFile(fileName);
    break;
  case "list":
    listFile(fileName);
    break;
  case "create":
    createRecord(fileName, arg1);
    break;
  case "update":
    updateRecord(fileName, parseInt(arg1), arg2);
    break;
  case "delete":
    deleteRecord(fileName, parseInt(arg1));
    break;
  case "register":
    registerUser(fileName, arg1); // here fileName = email, arg1 = password
    break;
  case "login":
    loginUser(fileName, arg1); // here fileName = email, arg1 = password
    break;
  default:
    console.log("Unknown command!");
    console.log(`Usage:
    node index.js read data.txt
    node index.js list data.txt
    node index.js create data.txt "text"
    node index.js update data.txt 3 "new text"
    node index.js delete data.txt 2
    node index.js register email password
    node index.js login email password`);
}
