//const express = require('express');
//const mongoose = require('mongoose');
//import db from '../config/connection.js';
//import thought from './src/models/Thought.ts';
//import user from './src/models/User.ts';
//const routes = require('./routes/api/socialNetworkAPI.js');
//const connection = require('../config/connection.js');
//const PORT = process.env.PORT || 3001; 
//const PORT = 3001;
//const app = express();
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use('/api', routes);
//db.once('open', () => {
//  app.listen(PORT, () => {
//    console.log(`API server running on port ${PORT}!`);
//  });
//});
import express from 'express';
// import db from './config/connection.ts';
import db from './config/connection.js'; // Use the compiled JavaScript file
// Require model
// import { Thought, User } from '../models/index.ts';
import routes from './routes/api/SocialNetworkAPI.js';
//const routes = require('./routes/api/SocialNetworkAPI.js');
// const connection = require('../config/connection.ts');
// Run npm install mongodb and require mongodb and MongoClient class
// import { MongoClient } from 'mongodb';
const PORT = process.env.PORT || 3001;
const app = express();
// Connection string to local instance of MongoDB
// const connectionStringURI = `mongodb://127.0.0.1:27017`;
// Initialize a new instance of MongoClient
// const client = new MongoClient(connectionStringURI);
// Create variable to hold our database name
// const dbName = 'bootcampUofT';
// Use connect method to connect to the mongo server
// await client.connect()
// .catch(err => {console.log(err)});
// const db = client.db(dbName);
// Built in Express function that parses incoming requests to JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', routes);
// Post request to create a single document to collection
//app.post('/books', async (req, res) => {
//  try {
//    // collection() creates or selects instance of collection. Takes in collection name
//    // insertOne() inserts single document into collection. Takes in object.
//    const results = await db.collection('bookCollection').insertOne(
//       { title: req.body.title, author: req.body.author }
//     )
//     // Sends results
//     res.status(201).json(results);
//   }
//   catch (error) {
//     // Handles error
//     res.status(500).json({ error });
//   }
// });
// Post request to add multiple sample documents to collection
// app.post('/books/seed', async (_req, res) => {
//   try {
//     const results = await db.collection('bookCollection').insertMany(
//       [
//         { "title": "Oh the Places We Will Go!" },
//         { "title": "Diary of Anne Frank" }
//       ]
//     )
//     // Sends results
//     res.status(201).json(results);
//   } catch (error) {
//     // Handles error
//     res.status(500).json({ error });
//   }
// });
// Get request to read all the documents in a collection
// app.get('/books', async (_req, res) => {
//   try {
//     const results = await db.collection('bookCollection')
//       // find() returns all documents. Equivalent to `Select *` in SQL.
//       .find({})
//       // Returns all the documents in an array
//       .toArray()
//     // Sends results
//     res.status(200).json(results);
//   }
//   catch (error) {
//     // Handles error
//     res.status(500).json({ error });
//   }
// });
// app.listen(PORT, () => {
//   console.log(`Example app listening at http://localhost:${PORT}`);
// });
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
//# sourceMappingURL=server.js.map