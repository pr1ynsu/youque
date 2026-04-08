import express from "express";
import {
  createBooking,
  getBookings,
  acceptBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/create", createBooking);
router.get("/", getBookings);
router.post("/accept", acceptBooking);

export default router;