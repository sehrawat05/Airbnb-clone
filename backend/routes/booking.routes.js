import express from "express";
import { createBooking } from "../controllers/booking.controller.js";
import isAuth from "../middleware/isAuth.js";
import { cancelBooking } from "../controllers/booking.controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/create/:id",isAuth,createBooking)
bookingRouter.delete("/cancel/:id",isAuth,cancelBooking)

export default bookingRouter;