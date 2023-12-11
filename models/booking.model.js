import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    amount: { type: Number, required: true },
    paystack_ref: { type: String, required: true },
    bookingId:{ type: String, required: true }, 
    uniqueBookingId:{ type: String, required: true }, 
    emergencyFirstName:{ type: String, required: true }, 
    emergencyLastName:{ type: String, required: true }, 
    emergencyEmail:{ type: String, required: true }, 
    emergencyPhone:{ type: String, required: true }, 
    type: {type:String},
    category: {type: String},
    trip: { type: Schema.Types.ObjectId, required: true, ref: "Trip" },
    returnTrip: { type: Schema.Types.ObjectId, ref: "Trip" },
    status: { type: String, default: 'Active' },
    createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;