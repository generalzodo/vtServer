import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tripSchema = new mongoose.Schema({
    route: { type: Schema.Types.ObjectId, required: true, ref: "Route" },
    driver: { type: Schema.Types.ObjectId, ref: "Driver" },
    availableSeats: { type: Number },
    seats: [],
    title: { type: String },
    bus: { type: String },
    busNo: { type: String },
    time: { type: String },
    status: { type: String, default: 'pending' },
    tripDate: { type: String},
    createdAt: { type: Date, default: Date.now }
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;