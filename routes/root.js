// import AuthRouter from "./auth/index.js";

import { Router } from "express";
import RouteRouter from "./route.route.js";
import LocationRouter from "./location.route.js";
import DriverRouter from "./driver.route.js";
import BookingRouter from "./booking.route.js";
import BusRouter from "./bus.route.js";
import TripRouter from "./trip.route.js";
// import { isLoggedIn } from "../middleware/index.js";

const router = Router();

/* GET home page. */

router.get("/", (req, res) => {
  res.send("Up and running 👍");
});

// router.use("/auth", AuthRouter);
router.use("/routes", RouteRouter);
router.use("/locations", LocationRouter);
router.use("/booking", BookingRouter);
router.use("/drivers", DriverRouter);
router.use("/buses", BusRouter);
router.use("/trips", TripRouter);
// router.use("/user", isLoggedIn, UserRouter);

export default router;
