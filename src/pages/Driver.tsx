import { useEffect, useState } from "react";
import "../styles/driver.css";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Driver() {
  const [status, setStatus] = useState("available");
  const [location, setLocation] = useState<any>(null);

  const route = "Campus 6 → Campus 15";
  const timing = "8:00 AM – 10:00 AM";

  const user = auth.currentUser;

  const updateCart = async (lat: number, lng: number) => {
    if (!user) return;

    await setDoc(
      doc(db, "carts", user.uid),
      {
        lat,
        lng,
        status,
        route,
        timing,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setLocation({ lat, lng });
      updateCart(lat, lng);
    });
  };

  useEffect(() => {
    const interval = setInterval(getLocation, 5000);
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="driver-root">
      <h2>Driver Dashboard</h2>

      <div className="driver-card">
        <h3>{route}</h3>
        <p>{timing}</p>
      </div>

      <div className="status-buttons">
        <button onClick={() => setStatus("available")}>Available</button>
        <button onClick={() => setStatus("few")}>Few</button>
        <button onClick={() => setStatus("full")}>Full</button>
      </div>

      <div>
        {location ? (
          <>
            <p>Lat: {location.lat}</p>
            <p>Lng: {location.lng}</p>
          </>
        ) : (
          <p>Fetching location...</p>
        )}
      </div>
    </div>
  );
}