import "../../styles/driver.css";
import { Settings, Play, StopCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useUI } from "../../context/UIContext";

import { db } from "../../firebase";
import {
  doc,
  updateDoc,
  setDoc,
  onSnapshot,
  collection,
  getDocs
} from "firebase/firestore";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  CircleMarker,
  Popup
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function DriverCart() {
  const { setModalOpen } = useUI();

  const [running, setRunning] = useState(false);

  const [driverId, setDriverId] = useState("");
  const [cartId, setCartId] = useState("cart1");

  const [status, setStatus] = useState("available");
  const [location, setLocation] = useState<any>(null);

  const [route, setRoute] = useState("Not Assigned");
  const [timing, setTiming] = useState("-");
  const [seats, setSeats] = useState(10);

  const [routeCoords, setRouteCoords] = useState<any[]>([]);
  const [stops, setStops] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔥 ASSIGN DRIVER
  const assignDriver = async () => {
    if (!driverId) return;

    await updateDoc(doc(db, "carts", cartId), {
      driverId: driverId,
      currentIndex: 0
    });

    // ensure full structure exists
    await setDoc(
      doc(db, "carts", cartId),
      {
        status: "available",
        seats: 10,
        location: { lat: 0, lng: 0 }
      },
      { merge: true }
    );
  };

  // 🔥 LIVE CART DATA
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "carts", cartId), (snap) => {
      const data = snap.data();
      if (!data) return;

      setRoute(data.route || "Not Assigned");
      setTiming(data.timing || "-");
      setStatus(data.status || "available");
      setSeats(data.seats ?? 10);
      setCurrentIndex(data.currentIndex ?? 0);
    });

    return () => unsub();
  }, [cartId]);

  // 🔥 LOAD ROUTE + STOPS
  useEffect(() => {
    if (!route) return;

    const load = async () => {
      const routeSnap = await getDocs(collection(db, "routes"));
      const campusSnap = await getDocs(collection(db, "campuses"));

      const campusMap: any = {};

      campusSnap.docs.forEach(doc => {
        const d = doc.data();
        if (!d.location) return;

        campusMap[d.name] = [
          d.location.latitude,
          d.location.longitude
        ];
      });

      const routeData = routeSnap.docs
        .map(d => d.data())
        .find(r => r.name === route);

      if (!routeData) return;

      const coords = routeData.stops
        .map((s: string) => campusMap[s])
        .filter(Boolean);

      if (coords.length === 0) return;

      setStops(routeData.stops);
      setRouteCoords(coords);
    };

    load();
  }, [route]);

  // 🔥 UPDATE CART (SAFE)
  const updateCart = async (lat: number, lng: number) => {
    if (!cartId) return;

    await updateDoc(doc(db, "carts", cartId), {
      location: { lat, lng },
      status,
      seats,
      currentIndex
    });
  };

  // 🔁 GPS LOOP
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setLocation({ lat, lng });

        // 🔥 STOP DETECTION
        routeCoords.forEach((coord, i) => {
          const dist =
            Math.abs(coord[0] - lat) +
            Math.abs(coord[1] - lng);

          if (dist < 0.001 && i > currentIndex) {
            setCurrentIndex(i);
          }
        });

        updateCart(lat, lng);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [running, routeCoords, currentIndex, status, seats]);

  return (
    <div className="driver-root">

      {/* HEADER */}
      <div className="driver-header">
        <div className="driver-avatar">D</div>
        <Settings size={20} onClick={() => setModalOpen(true)} />
      </div>

      {/* DRIVER ID */}
      <input
        placeholder="Enter Driver ID"
        value={driverId}
        onChange={(e) => setDriverId(e.target.value)}
        className="driver-select"
      />

      <button className="primary-btn" onClick={assignDriver}>
        Assign Myself
      </button>

      {/* CART SELECT */}
      <select
        value={cartId}
        onChange={(e) => setCartId(e.target.value)}
        className="driver-select"
      >
        <option value="cart1">Cart 1</option>
        <option value="cart2">Cart 2</option>
        <option value="cart3">Cart 3</option>
        <option value="cart4">Cart 4</option>
      </select>

      {/* MAIN CARD */}
      <div className="driver-main-card">
        <p className="label">Current Route</p>
        <h3>{route}</h3>
        <p className="sub">{timing}</p>

        <div className={`status-pill ${status}`}>
          {status}
        </div>
      </div>

      {/* START STOP */}
      <button
        className={`driver-toggle ${running ? "stop" : "start"}`}
        onClick={() => setRunning(!running)}
      >
        {running ? <StopCircle size={18} /> : <Play size={18} />}
        {running ? " Stop Route" : " Start Route"}
      </button>

      {/* STATUS */}
      <div className="driver-status-row">
        {["available", "few", "full"].map((s) => (
          <button
            key={s}
            className={status === s ? "active" : ""}
            onClick={() => setStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* SEATS */}
      <div className="driver-info-card">
        <p><b>Seats Left:</b> {seats}</p>

        <input
          type="range"
          min="0"
          max="12"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
        />
      </div>

      {/* MAP */}
      <div className="driver-map">
        {routeCoords.length > 0 && (
          <MapContainer
            center={routeCoords[0]}
            zoom={16}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Polyline positions={routeCoords} color="blue" />

            {routeCoords.map((pos, i) => (
              <CircleMarker
                key={i}
                center={pos}
                radius={8}
                pathOptions={{
                  color: i <= currentIndex ? "green" : "gray"
                }}
              >
                <Popup>{stops[i]}</Popup>
              </CircleMarker>
            ))}

            {location && (
              <Marker position={[location.lat, location.lng]} />
            )}
          </MapContainer>
        )}
      </div>

    </div>
  );
}