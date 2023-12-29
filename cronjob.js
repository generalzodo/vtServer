// cronjob.js

import { CronJob } from 'cron';
import Route from './models/route.model.js';
import Trip from './models/trips.model.js';

// Your task to be executed
const yourTask = async () => {
  console.log('Cron job is running on Wednesday!');
  // Add your logic or call your function here
  let days = getDays()
  let time = ['6am', '7:30am', '8:30am']
  for await (const day of days) {

    let routes = await Route.find({recurrentDays: day.day}).populate({path: 'bus'});
    // console.log(day.day);
    // console.log(routes)
    for await (const route of routes) {

      for (let index = 0; index < route.totalTrips; index++) {
        // const element = array[index];

        const newTrip = new Trip({

          title: route.title +' '+(index+1),
          route: route._id,
          availableSeats: route.bus.seats,
          tripDate: day.date,
          time: time[index]
        }); 
        newTrip.save()
        console.log(newTrip);
      }

    };
  }
}
setTimeout(() => {
  
   yourTask()
}, 3000);
  // Define the cron schedule (every Wednesday at midnight)
  const cronJob = new CronJob('0 0 * * 3', yourTask);

  // Start the cron job
  // cronJob.start();

  // Log when the cron job is started
  console.log('Cron job scheduled to run on Wednesday at midnight.');

  function getDays() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get the current date
    const currentDate = new Date();

    // Find the next Sunday
    const nextSunday = new Date(currentDate);
    // nextSunday.setDate(currentDate.getDate() + (7 - currentDate.getDay()));

    // Generate an array of objects where each object has a 'day' and 'date' property
    const datesArray = [];
    for (let i = 0; i < 6; i++) {
      const currentDate = new Date(nextSunday);
      currentDate.setDate(nextSunday.getDate() + i);

      const dayName = daysOfWeek[currentDate.getDay()];
      const dateString = currentDate.toISOString().split('T')[0];

      // Push an object with 'day' and 'date' properties into the array
      datesArray.push({ day: dayName, date: dateString });
    }

    console.log(datesArray);
    return datesArray
  }
