const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const PORT = process.env.PORT || 3999;
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set up multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]
    );
  },
});
const upload = multer({ storage: storage });

app.use('/fileupload', upload.array('documents', 5), async (req, res, next) => {
  res.json({
    files: req.files,
  });
});

app.use('/', (req, res, next) => {
  res.send('Health check');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
