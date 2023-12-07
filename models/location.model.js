import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    address: { type: String },
    state: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Location = mongoose.model('Location', locationSchema);

export default Location;