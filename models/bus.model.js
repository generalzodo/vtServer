import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
    title: { type: String, required: true },
    photo: { type: String },
    type: { type: String },
    status: {type: String, default: 'Active'},
    createdAt: { type: Date, default: Date.now },
    seats: Number
});

const Bus = mongoose.model('Bus', busSchema);

export default Bus;