import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String },
    status: { type: String, default: 'Active' },
    createdAt: { type: Date, default: Date.now }
});

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;