import Booking from '../models/booking.model.js';
import Trip from '../models/trips.model.js';
/**
 * Create a new Booking item.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
// Create a new Booking
export const fetchBookings = async (req, res) => {
  try {
    const result =   await Booking.find({}).populate('trip').sort({createdAt:-1});
    res.status(201).json({success:true, data: result});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchSingleBooking = async (req, res) => {
  try {
    const result =   Booking.findOne({ _id: req.params.id });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    let passengers = req.body.data.passengers;
    let emergency = req.body.data.emergencyContact
    let bookingId =generateBookingId();
    console.log(emergency);

    let trip = await Trip.findById(req.body.trip)
    let returntrip = await Trip.findById(req.body.returnTrip)
    console.log(returntrip);
    for await (const it of passengers) {
      
    const newBooking = new Booking({

      firstName: it.firstName,
      middleName: it.middleName,
      lastName: it.lastName,
      phone: it.phone,
      email: it.email,
      dob: it.dob,
      gender: it.gender.title,
      amount: req.body.amount,
      paystack_ref: req.body.trans_ref,
      bookingId: 'T'+ bookingId,
      uniqueBookingId: 'T'+generateBookingId(),
      emergencyFirstName: emergency.firstName,
      emergencyLastName: emergency.lastName,
      emergencyEmail: emergency.email,
      emergencyPhone: emergency.phone,
      trip: req.body.trip,
      returnTrip: req.body.returntrip,
      status: req.body.status,
      tripSeat: it.tripSeat,
      returnSeat: it.returnSeat

    });
    await newBooking.save();
    trip.availableSeats = trip.availableSeats - 1
    trip.seats.push(it.tripSeat)
    trip.save();

    if(returntrip){
      returntrip.availableSeats = returntrip.availableSeats - 1
      returntrip.seats.push(it.returnSeat)
      returntrip.save();
    }
    
  }

    const result = {status: 'success', data: 'T'+ bookingId}
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBooking = async (req, res) => {

  let isError = { error: false, message: "" };
  for (const key in req.body) {
    let isBoolean = typeof req.body[key] === "boolean";
    if (!isBoolean) {
      if (!req.body[key]) {
        console.log(`${key} is empty`);
        isError = {
          error: true,
          message: `${key} cannot be empty. Add a value or remove it from the request body`,
        };
      }
    }
  }
  if (isError.error) {
    // res.status(400).json(isError);
    throw new Error('Something went wrong, pls try again later')

  }
  try {
    const result = await Booking.updateOne({ _id: req.params.id }, { ...req.body });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const result =  await Booking.deleteOne({ _id: req.params.id })
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

function generateBookingId() {
  const timestamp = new Date().getTime(); // Get current timestamp
  const randomPart = Math.floor(Math.random() * 1000); // Add a random number for extra uniqueness

  // Combine timestamp and random number
  const bookingId = `${timestamp}${randomPart}`;

  return bookingId;
}