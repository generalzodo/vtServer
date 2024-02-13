// cronjob.js

import { CronJob } from 'cron';
const axios = require('axios');

import Route from './models/route.model.js';
import Trip from './models/trips.model.js';
import Booking from './models/booking.model.js';
import { log } from 'winston';
const SECRET_KEY = 'sk_live_5d188bedd28dac0e4a3d5db6a1cc3912df97652f';
// Your task to be executed
const yourTask = async () => {
  console.log('Cron job is running on Wednesday!');
  // Add your logic or call your function here
  let days = getDays()
  for await (const day of days) {

    let routes = await Route.find({ recurrentDays: day.day }).populate({ path: 'bus' });
    // console.log(day.day);
    // console.log(routes)
    for await (const route of routes) {

      for (let index = 0; index < route.totalTrips; index++) {
        // const element = array[index];

        const newTrip = new Trip({

          // title: route.title +' '+(index+1),
          title: route.title,
          bus: route.bus.title,
          route: route._id,
          availableSeats: route.bus.seats,
          tripDate: day.date,
          time: route.times[index]
        });
        newTrip.save()
        console.log(newTrip);
      }

    };
  }
}

const checkforPendingOrders = async () => {
  //check orderNo with paystack
  let bookings = await Booking.find({
    paymentStatus: 'pending'

  })

  // console.log(bookings);
  for await (const it of bookings) {
    if (checkIfFifteenMinutesPassed(it.createdAt, 15)) {
      // it.status = 'completed';
      console.log('checking');

      let status = await checkTransaction(it.bookingId);
      if (status) {
        it.paymentStatus = 'success';
        it.paystack_ref = it.bookingId;
      } else {
        let trip = await Trip.findById(it.trip);
        if (trip) {
          trip.seats = removeItemFromArray(trip.seats, it.tripSeat);
          trip.save()
        }
        if (it.returnTrip) {
          let returnTrip = await Trip.findById(it.returnTrip);
          if (returnTrip) {

            returnTrip.seats = removeItemFromArray(returnTrip.seats, it.returnSeat);
            returnTrip.save()
          }
        }
        it.status = 'Cancelled, Seat freed';
        it.paymentStatus = 'Payment Not Found';
      }
      it.save();
    }
  }
}

const checkTransaction = async (transactionId) => {
  console.log(transactionId);
  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;
    // console.log(data);

    // Return the status of the transaction
    return data.status;
  } catch (error) {
    console.error('Error fetching transaction:', error.response.data);
    return null;
  }
};
const checkTripToConfirmMovement = async () => {
  const currentDateTime = getCurrentDate();

  let trips = await Trip.find({
    status: 'pending', tripDate: currentDateTime

  })

  for await (const it of trips) {
    if (hasTimePassed(it.time, 5)) {
      it.status = 'completed';
      console.log(it);
      it.save();
    }
  }

  console.log(trips.length);

  //check orderNo with paystack
}
checkforPendingOrders()

// checkTripToConfirmMovement();
// setTimeout(() => {

//  yourTask()
// }, 3000);
// Define the cron schedule (every Wednesday at midnight)

// Start the cron job
const cronJob = new CronJob('0 0 * * 3', yourTask);
const cronJob1 = new CronJob('*/5 * * * *', checkTripToConfirmMovement);
const cronJob2 = new CronJob('*/5 * * * *', checkforPendingOrders);
cronJob.start();
cronJob1.start();
cronJob2.start();

// Log when the cron job is started
console.log('Cron job scheduled to run on Wednesday at midnight.');

function getDays() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Get the current date
  const currentDate = new Date();

  // Find the next Sunday
  const nextSunday = new Date(currentDate);
  nextSunday.setDate(currentDate.getDate() + (7 - currentDate.getDay()));

  // Generate an array of objects where each object has a 'day' and 'date' property
  const datesArray = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(nextSunday);
    currentDate.setDate(nextSunday.getDate() + i);

    const dayName = daysOfWeek[currentDate.getDay()];
    const dateString = formatDate(currentDate);

    // Push an object with 'day' and 'date' properties into the array
    datesArray.push({ day: dayName, date: dateString });
  }

  console.log(datesArray);
  return datesArray
}

function formatDate(date) {
  // Function to add leading zeros to single-digit numbers
  function addLeadingZero(number) {
    return number < 10 ? "0" + number : number;
  }

  // Format the date as dd-mm-yyyy
  var formattedDate =
    addLeadingZero(date.getDate()) + "-" +
    addLeadingZero(date.getMonth() + 1) + "-" +
    date.getFullYear();

  return formattedDate;
}

function hasTimePassed(targetTime, minutes) {
  const now = new Date();

  // Parse the target time string to create a Date object
  const targetDate = new Date(`${now.toDateString()} ${targetTime}`);

  // Add 5 minutes to the target time
  const targetTimePlus5Minutes = new Date(targetDate.getTime() + minutes * 60000); // 60000 milliseconds in a minute

  // Check if the current time is greater than the target time plus 5 minutes
  return now > targetTimePlus5Minutes;
}
const checkIfFifteenMinutesPassed = (datetime) => {
  const fifteenMinutesInMilliseconds = 15 * 60 * 1000; // 15 minutes in milliseconds
  const providedDate = new Date(datetime);
  const currentDate = new Date();

  // Calculate the difference in milliseconds between current time and provided datetime
  const timeDifference = currentDate - providedDate;

  // Check if the time difference is greater than or equal to 15 minutes
  return timeDifference >= fifteenMinutesInMilliseconds;
};

function getCurrentDate() {
  const now = new Date();

  // Get day, month, and year
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = now.getFullYear();

  // Combine into the desired format
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;

}
const removeFirstCharacter = (str) => {
  return str.substring(1);
};
const removeItemFromArray = (array, itemToRemove) => {
  return array.filter(item => item !== itemToRemove);
};

// const cronJob = new CronJob('0 0 * * 3', yourTask);

