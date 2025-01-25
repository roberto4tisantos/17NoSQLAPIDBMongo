// @ts-ignore
import express from 'express';
import User from '../../models/User.js';
import Thought from '../../models/Thought.js';
const router = express.Router();
// /api/users
// GET all users
router.get('/users', async (_req, _res) => {
    try {
        const users = await User.find();
        _res.status(200).json(users);
    }
    catch (err) {
        console.log('Error get users');
        _res.status(500).json({ error: 'Error get users' });
    }
});
// GET a single user by its _id
router.get('/users/:userId', async (_req, _res) => {
    try {
        const user = await User.findById(_req.params.userId)
            // @ts-ignore
            .populate('thoughts')
            .populate('friends');
        _res.status(200).json(user);
    }
    catch (err) {
        console.log('Error get users');
        _res.status(500).json({ error: 'Error get users' });
    }
});
// POST to create a new user
router.post('/users', async (_req, _res) => {
    try {
        // @ts-ignore
        const newUser = new User(_req.body);
        await newUser.save();
        _res.status(200).json(newUser);
    }
    catch (err) {
        console.log('Error post users');
        _res.status(500).json({ error: 'Error post users' });
    }
});
// PUT to update a user by its _id
router.put('/users/:userId', async (_req, _res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(_req.params.userId, _req.body, { new: true });
        _res.status(200).json(updatedUser);
    }
    catch (err) {
        console.log('Error put users');
        _res.status(500).json({ error: 'Error put users' });
    }
});
// DELETE to remove a user by its _id
router.delete('/users/:userId', async (_req, _res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(_req.params.userId);
        // @ts-ignore
        await Thought.deleteMany({ username: deletedUser.username }); // BONUS: Delete associated thoughts
        _res.status(200).json(deletedUser);
    }
    catch (err) {
        console.log('Error delete users');
        _res.status(500).json({ error: 'Error delete users' });
    }
});
// /api/thoughts
// POST to create a new thought
router.post('/thoughts', async (_req, _res) => {
    try {
        // @ts-ignore
        const newThought = new Thought(_req.body);
        await newThought.save();
        await User.findByIdAndUpdate(_req.body.userId, { $push: { thoughts: newThought._id } });
        _res.status(200).json(newThought);
    }
    catch (err) {
        console.log('Error post thoughts');
        _res.status(500).json({ error: 'Error post thoughts' });
    }
});
// GET all thoughts
router.get('/thoughts', async (_req, _res) => {
    try {
        const thoughts = await Thought.find();
        _res.status(200).json(thoughts);
    }
    catch (err) {
        console.log('Error get thoughts');
        _res.status(500).json({ error: 'Error get thoughts' });
    }
});
// GET a single thought by its _id
router.get('/thoughts/:thoughtId', async (_req, _res) => {
    try {
        const thought = await Thought.findById(_req.params.thoughtId);
        _res.status(200).json(thought);
    }
    catch (err) {
        console.log('Error get thoughts');
        _res.status(500).json({ error: 'Error get thoughts' });
    }
});
// DELETE to remove a thought by its _id
router.delete('/thoughts/:thoughtId', async (_req, _res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(_req.params.thoughtId);
        _res.status(200).json(deletedThought);
    }
    catch (err) {
        console.log('Error delete thoughts');
        _res.status(500).json({ error: 'Error delete thoughts' });
    }
});
// /api/users/:userId/friends/:friendId
// POST to add a new friend
router.post('/users/:userId/friends/:friendId', async (_req, _res) => {
    try {
        const user = await User.findById(_req.params.userId);
        const friend = await User.findById(_req.params.friendId);
        // @ts-ignore
        user.friends.push(friend);
        // @ts-ignore
        await user.save();
        _res.status(200).json(user);
    }
    catch (err) {
        console.log('Error post users');
        _res.status(500).json({ error: 'Error post users' });
    }
});
// DELETE to remove a friend
router.delete('/users/:userId/friends/:friendId', async (_req, _res) => {
    try {
        const user = await User.findById(_req.params.userId);
        // @ts-ignore
        user.friends.pull(_req.params.friendId);
        // @ts-ignore
        await user.save();
        _res.status(200).json(user);
    }
    catch (err) {
        console.log('Error delete users');
        _res.status(500).json({ error: 'Error delete users' });
    }
});
// /api/thoughts/:thoughtId/reactions
// POST to create a reaction
router.post('/thoughts/:thoughtId/reactions', async (_req, _res) => {
    try {
        const thought = await Thought.findById(_req.params.thoughtId);
        // @ts-ignore
        thought.reactions.push(_req.body);
        // @ts-ignore
        await thought.save();
        _res.status(200).json(thought);
    }
    catch (err) {
        console.log('Error post thoughts');
        _res.status(500).json({ error: 'Error post thoughts' });
    }
});
// DELETE to remove a reaction
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (_req, _res) => {
    try {
        const thought = await Thought.findById(_req.params.thoughtId);
        // @ts-ignore
        thought.reactions.pull(_req.params.reactionId);
        // @ts-ignore
        await thought.save();
        _res.status(200).json(thought);
    }
    catch (err) {
        console.log('Error delete thoughts');
        _res.status(500).json({ error: 'Error delete thoughts' });
    }
});
// Export the router
export default router;
//module.exports = router;
//# sourceMappingURL=SocialNetworkAPI.js.map