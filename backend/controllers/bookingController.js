import { readDB, writeDB } from "../utils/db.js";
import { v4 as uuidv4 } from "uuid";

// Create booking
export const createBooking = (req, res) => {
  const { userId, pickup, drop } = req.body;

  const db = readDB();

  const newBooking = {
    id: uuidv4(),
    userId,
    pickup,
    drop,
    status: "pending",
    driverId: null,
    createdAt: new Date(),
  };

  db.bookings.push(newBooking);
  writeDB(db);

  res.json(newBooking);
};

// Get bookings
export const getBookings = (req, res) => {
  const db = readDB();
  res.json(db.bookings);
};

// Accept booking
export const acceptBooking = (req, res) => {
  const { bookingId, driverId } = req.body;

  const db = readDB();

  const booking = db.bookings.find((b) => b.id === bookingId);

  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }

  booking.status = "accepted";
  booking.driverId = driverId;

  writeDB(db);

  res.json(booking);
};