import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const routeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    bus: { type: Schema.Types.ObjectId, required: true, ref: "Bus" },
    destination: { type: String },
    origin: { type: String },
    price: { type: Number, default: 10000 },
    premiumPrice: { type: Number, default: 12000 },
    discountedPrice: { type: Number, default: 500 },
    recurrentDays:[],
    totalTrips: {type: Number} ,
    totalTrips: {type: Number} ,
    createdAt: { type: Date, default: Date.now }
});

const Route = mongoose.model('Route', routeSchema);

export default Route;