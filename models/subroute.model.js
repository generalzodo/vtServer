import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const subrouteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    destination: { type: String },
    origin: { type: String },
    price: { type: Number, default: 10000 },
    premiumPrice: { type: Number, default: 12000 },
    discountedPrice: { type: Number, default: 500 },
    times:[],
    createdAt: { type: Date, default: Date.now },
    route: { type: Schema.Types.ObjectId, required: true, ref: "Route" },

});

const SubRoute = mongoose.model('SubRoute', subrouteSchema);

export default SubRoute;