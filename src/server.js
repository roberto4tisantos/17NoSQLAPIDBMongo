import express from 'express';
import db from './config/connection.js';  // Use the compiled JavaScript file
import routes from './routes/api/SocialNetworkAPI.js';

const PORT = process.env.PORT || 3001;
const app = express();

// Built in Express function that parses incoming requests to JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});