import express from "express";
import { createBooking } from "../controllers/booking.controller.js";
import isAuth from "../middleware/isAuth.js";

const bookingRouter = express.Router();

bookingRouter.post("/create",isAuth,createBooking)

export default bookingRouter;