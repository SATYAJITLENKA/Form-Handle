const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Multer configuration for image uploads
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const imageUpload = multer({ storage: imageStorage });

// Multer configuration for video uploads
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/videos');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const videoUpload = multer({ storage: videoStorage });

// Serve uploaded files as static content
app.use('/uploads', express.static('uploads'));

// Image upload route
app.post('/upload/image', imageUpload.single('image'), (req, res) => {
  if (req.file) {
    res.json({
      message: 'Image uploaded successfully',
      filename: req.file.filename
    });
  } else {
    res.status(400).json({ message: 'Image upload failed' });
  }
});

// Video upload route
app.post('/upload/video', videoUpload.single('video'), (req, res) => {
  if (req.file) {
    res.json({
      message: 'Video uploaded successfully',
      filename: req.file.filename
    });
  } else {
    res.status(400).json({ message: 'Video upload failed' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
