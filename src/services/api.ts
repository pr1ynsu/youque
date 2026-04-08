const API = "http://localhost:5000/api";

export const createBooking = async (data: any) => {
  const res = await fetch(`${API}/bookings/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getBookings = async () => {
  const res = await fetch(`${API}/bookings`);
  return res.json();
};

export const acceptBooking = async (data: any) => {
  const res = await fetch(`${API}/bookings/accept`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};