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
    const result = await Booking.find({}).populate('trip').sort({ createdAt: -1 });
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchSingleBooking = async (req, res) => {
  try {
    const result = await Booking.findOne({ bookingId: req.params.id }).populate('trip').populate('returnTrip');
    console.log(result)
    res.status(201).json({ data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const fetchAllBooking = async (req, res) => {
  try {
    const result = await Booking.find({ bookingId: req.params.id }).populate('trip').populate('returnTrip');
    console.log(result)
    res.status(201).json({ data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const fetchUserBooking = async (req, res) => {
  try {
    const result = await Booking.find({ user: req.params.id, $or: { paymentStatus: 'success', paymentStatus: 'admin paid' } }).populate('trip').sort({ createdAt: -1 });
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    let passengers = req.body.data.passengers;
    let bookingId = generateBookingId();

    let trip = await Trip.findById(req.body.trip)
    let returntrip = await Trip.findById(req.body.returnTrip)
    console.log(returntrip);
    for await (const it of passengers) {
      if (trip.seats.includes(it.tripSeat)) {
        throw new Error('One ore more seats selected is unavailable')

      }
      trip.seats.push(it.tripSeat)
      if (returntrip) {
        // returntrip.availableSeats = returntrip.availableSeats - 1
        if (returntrip.seats.includes(it.returnSeat)) {
        throw new Error('One ore more seats selected is unavailable')
          
        }

        returntrip.seats.push(it.returnSeat);

      }
    }

      for await (const it of passengers) {

      let emergency = it.emergencyContact

      const newBooking = new Booking({

        firstName: it.firstName,
        middleName: it.middleName,
        lastName: it.lastName,
        phone: it.phone,
        email: it.email,
        dob: it.dob,
        gender: it.gender.title,
        amount: req.body.amount,
        tripAmount: it.tripAmount,
        returnAmount: it.returnAmount,
        paystack_ref: req.body.trans_ref,
        bookingId: 'T' + bookingId,
        uniqueBookingId: 'T' + generateBookingId(),
        emergencyFirstName: emergency.firstName,
        emergencyLastName: emergency.lastName,
        emergencyEmail: emergency.email,
        emergencyPhone: emergency.phone,
        trip: req.body.trip,
        returnTrip: req.body.returnTrip,
        status: req.body.status,
        tripSeat: it.tripSeat,
        returnSeat: it.returnSeat,
        user: req.body.user,
        paymentStatus: paymentStatus
      });
   
      await newBooking.save();
      await trip.save();
      if (returntrip) {

      await returntrip.save();
      }
    }

    const result = { status: 'success', data: 'T' + bookingId }
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBooking = async (req, res) => {
  try {

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
    const result = await Booking.updateMany({ bookingId: req.params.id }, { ...req.body });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id })
    if (booking.status == 'Used') {
      throw new Error('this ticket has already been used')
    }

    res.status(201).json(booking,);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const result = await Booking.deleteOne({ _id: req.params.id })
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

function generateBookingId() {
  const timestamp = new Date().getTime(); // Get current timestamp
  const randomPart = Math.floor(Math.random() * 10); // Add a random number for extra uniqueness

  // Combine timestamp and random number
  const bookingId = `${timestamp}${randomPart}`;

  return bookingId;
}