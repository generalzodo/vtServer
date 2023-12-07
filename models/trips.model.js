import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tripSchema = new mongoose.Schema({
    route: { type: Schema.Types.ObjectId, required: true, ref: "Route" },
    driver: { type: Schema.Types.ObjectId, required: true, ref: "Driver" },
    availableSeats: { type: Number },
    title: { type: String },
    status: { type: String, default: 'pending' },
    tripDate: { type: Date},
    createdAt: { type: Date, default: Date.now }
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;