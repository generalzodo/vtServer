import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const routeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    bus: { type: Schema.Types.ObjectId, required: true, ref: "Bus" },
    destination: { type: String },
    origin: { type: String },
    amount: { type: Number },
    recurrentDays:[],
    totalTrips: {type: Number} ,
    createdAt: { type: Date, default: Date.now }
});

const Route = mongoose.model('Route', routeSchema);

export default Route;