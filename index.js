const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

const uploadDir = path.join(__dirname, 'uploads');

// Create the 'uploads' folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Handle POST requests with file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  // Access the uploaded file using req.file
  if (req.file) {
    // File uploaded successfully
    console.log('File uploaded successfully : ' + req.file.originalname);
    res.status(200).json({ message: 'File uploaded successfully' });
  } else {
    // No file was provided
    res.status(400).json({ message: 'No file provided' });
  }
});

app.get("/", (req, res) => {
  res.send("Upload file ready!");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
