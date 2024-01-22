import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: String },
    gender: { type: String, required: true },
    amount: { type: Number, required: true },
    tripAmount: { type: Number, default: 0 },
    returnAmount: { type: Number, default: 0 },
    paystack_ref: { type: String,  },
    bookingId:{ type: String, required: true }, 
    uniqueBookingId:{ type: String, required: true }, 
    emergencyFirstName:{ type: String, required: true }, 
    emergencyLastName:{ type: String, required: true }, 
    emergencyEmail:{ type: String}, 
    emergencyPhone:{ type: String, required: true }, 
    type: {type:String},
    tripSeat: {type:String},
    returnSeat: {type:String},
    category: {type: String},
    bus: {type: String},
    trip: { type: Schema.Types.ObjectId, required: true, ref: "Trip" },
    user: { type: Schema.Types.ObjectId,  ref: "User" },
    returnTrip: { type: Schema.Types.ObjectId, ref: "Trip" },
    status: { type: String, default: 'Pending' },
    mode: { type: String, default: 'Paystack' },
    paymentStatus: { type: String,  },
    createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;