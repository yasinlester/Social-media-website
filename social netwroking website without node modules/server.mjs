// Import required modules
import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import session from 'express-session';
import fileUpload from 'express-fileupload';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';


// Initialize Express app
const app = express();
const port = 9000; // port number
const mongoURI = 'mongodb://localhost:27017'; // MongoDB URI
const __dirname = dirname(fileURLToPath(import.meta.url));

let db; // Define db variable

// Connect to MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log('Mongo connected');
    db = client.db(); // Set the database object for use in the application
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse JSON request bodies
app.use(bodyParser.json());

// Use the express-fileupload middleware
app.use(fileUpload());

// Setup express-session middleware
app.use(
  session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
  })
);

// Define routes
// GET request to retrieve data
app.get('/M00809695', async (req, res) => {
  try {
    const data = await db.collection('YourCollection').find().toArray();
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

// POST request to add new data
app.post('/M00809695', async (req, res) => {
  try {
    // Store data in the MongoDB collection
    const newData = await db.collection('YourCollection').insertOne(req.body);

    // Send a response indicating data received
    res.json({ name: 'Data received.' });
  } catch (error) {
    handleError(res, error);
  }
});





// POST request to handle user registration with availability check
app.post('/M00809695/register', async (req, res) => {
  try {
    // Check if the username or email is already taken
    const existingUser = await db.collection('user').findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.email },
      ],
    });

    if (existingUser) {
      // Username or email is already taken
      res.status(400).json({ error: 'Username or email already in use.' });
    } else {
      // Username and email are available, proceed with registration
      const newUser = await db.collection('user').insertOne(req.body);
      console.log('User registered:', newUser);
      res.json({ name: 'Registration successful.' });
    }
  } catch (error) {
    handleError(res, error);
  }
});



// GET request to check username and email availability
app.get('/M00809695/checkAvailability', async (req, res) => {
  const { username, email } = req.query;

  try {
    // Check if the username is already taken
    const usernameTaken = await db.collection('user').findOne({ username });

    // Check if the email is already taken
    const emailTaken = await db.collection('user').findOne({ email });

    res.json({ usernameTaken: !!usernameTaken, emailTaken: !!emailTaken });
  } catch (error) {
    handleError(res, error);
  }
});

// POST request to handle user login
app.post('/M00809695/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username and password match a user in the database
    const user = await db.collection('user').findOne({
      username: username,
      password: password,
    });

    if (user) {
      // Login successful
      // Save user data in the session
      req.session.user = user;

      // Log session data
      console.log('Session Data:', req.session);

      res.json({ valid: true });
    } else {
      // Invalid credentials
      res.json({ valid: false });
    }
  } catch (error) {
    handleError(res, error);
  }
});

// POST request to handle file upload
app.post('/M00809695/upload', async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Get the uploaded file
    const file = req.files.file;

    // Save the file to the 'uploads' directory
    await file.mv(`${__dirname}/public/uploads/${file.name}`);

    // Store the file information in the MongoDB database
    const result = await db.collection('uploads').insertOne({
      filename: file.name,
      path: `/uploads/${file.name}`,
      createdAt: new Date(),
    });

    // Send a success response
    res.json({ message: 'File uploaded successfully', fileId: result.insertedId, filePath: `/uploads/${file.name}` });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});
// POST request to handle blog post creation with file upload
app.post('/M00809695/blog', async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Get the uploaded file
    const file = req.files.file;

    // Save the file to the 'uploads' directory
    await file.mv(join(__dirname, 'public', 'uploads', file.name));

    // Store the blog post information in the MongoDB database
    const { blogCaption } = req.body;
    const newBlogPost = await db.collection('blogPosts').insertOne({
      caption: blogCaption,
      imagePath: `/uploads/${file.name}`,
      createdAt: new Date(),
    });

    // Send a success response
    res.json({ message: 'Blog post created successfully', postId: newBlogPost.insertedId, imagePath: `/uploads/${file.name}` });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Error creating blog post' });
  }
});

// PUT request to update existing data
app.put('/:studentID/:dataID', async (req, res) => {
  const { studentID, dataID } = req.params;
  const { name, studentID: reqStudentID, studentEmail } = req.body;

  try {
    const updatedData = await db.collection('YourCollection').findOneAndUpdate(
      { _id: new require('mongodb').ObjectID(dataID), studentID },
      { $set: { name, studentID: reqStudentID, studentEmail } },
      { returnDocument: 'after' }
    );

    res.json(updatedData.value);
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});