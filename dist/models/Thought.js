import mongoose from 'mongoose';
//const mongoose = require('mongoose'); 
const { Schema } = mongoose;
// Reaction Schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // @ts-ignore
        get: (createdAtVal) => createdAtVal.toISOString(),
    },
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // @ts-ignore
        get: (createdAtVal) => createdAtVal.toISOString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
// Uses mongoose.model() to create model
const Thought = mongoose.model('Thought', thoughtSchema);
//module.exports = Thought;
export default Thought;
// @ts-ignore
export function deleteMany(_arg0) {
    throw new Error('Function not implemented.');
}
export function find() {
    throw new Error('Function not implemented.');
}
// @ts-ignore
export function findById(_thoughtId) {
    throw new Error('Function not implemented.');
}
// @ts-ignore
export function findByIdAndDelete(_thoughtId) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=Thought.js.map