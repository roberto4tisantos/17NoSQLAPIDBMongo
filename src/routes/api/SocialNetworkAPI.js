// @ts-ignore
import { Request, Response } from 'express';

const express = require('express');
const User = require('../../models/User.js'); 
const Thought = require('../../models/Thought.js'); 
const router = express.Router();

// /api/users
// GET all users
router.get('/users', async (_req, _res) => {
  const users = await User.find();
  _res.json(users);
});

// GET a single user by its _id
router.get('/users/:userId', async (_req, _res) => {
  const user = await User.findById(_req.params.userId)
    // @ts-ignore
    .populate('thoughts')
    .populate('friends');
  _res.json(user);
});

// POST to create a new user
router.post('/users', async (_req, _res) => {
  // @ts-ignore
  const newUser = new User(_req.body);
  await newUser.save();
  _res.json(newUser);
});

// PUT to update a user by its _id
router.put('/users/:userId', async (_req, _res) => {
  const updatedUser = await User.findByIdAndUpdate(_req.params.userId, _req.body, { new: true });
  _res.json(updatedUser);
});

// DELETE to remove a user by its _id
router.delete('/users/:userId', async (_req, _res) => {
  const deletedUser = await User.findByIdAndDelete(_req.params.userId);
  // @ts-ignore
  await Thought.deleteMany({ username: deletedUser.username }); // BONUS: Delete associated thoughts
  _res.json(deletedUser);
});

// /api/thoughts
// POST to create a new thought
router.post('/thoughts', async (_req, _res) => {
  // @ts-ignore
  const newThought = new Thought(_req.body);
  await newThought.save();
  await User.findByIdAndUpdate(_req.body.userId, { $push: { thoughts: newThought._id } });
  _res.json(newThought);
});

// GET all thoughts
router.get('/thoughts', async (_req, _res) => {
  const thoughts = await Thought.find();
  _res.json(thoughts);
});

// GET a single thought by its _id
router.get('/thoughts/:thoughtId', async (_req, _res) => {
  const thought = await Thought.findById(_req.params.thoughtId);
  _res.json(thought);
});

// DELETE to remove a thought by its _id
router.delete('/thoughts/:thoughtId', async (_req, _res) => {
  const deletedThought = await Thought.findByIdAndDelete(_req.params.thoughtId);
  _res.json(deletedThought);
});

// /api/users/:userId/friends/:friendId
// POST to add a new friend
router.post('/users/:userId/friends/:friendId', async (_req, _res) => {
  const user = await User.findById(_req.params.userId);
  const friend = await User.findById(_req.params.friendId);
  // @ts-ignore
  user.friends.push(friend);
  // @ts-ignore
  await user.save();
  _res.json(user);
});

// DELETE to remove a friend
router.delete('/users/:userId/friends/:friendId', async (_req, _res) => {
  const user = await User.findById(_req.params.userId);
  // @ts-ignore
  user.friends.pull(_req.params.friendId);
  // @ts-ignore
  await user.save();
  _res.json(user);
});

// /api/thoughts/:thoughtId/reactions
// POST to create a reaction
router.post('/thoughts/:thoughtId/reactions', async (_req, _res) => {
  const thought = await Thought.findById(_req.params.thoughtId);
  // @ts-ignore
  thought.reactions.push(_req.body);
  // @ts-ignore
  await thought.save();
  _res.json(thought);
});

// DELETE to remove a reaction
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (_req, _res) => {
  const thought = await Thought.findById(_req.params.thoughtId);
  // @ts-ignore
  thought.reactions.pull(_req.params.reactionId);
  // @ts-ignore
  await thought.save();
  _res.json(thought);
});

// Export the router
export default router; 

module.exports = router;




