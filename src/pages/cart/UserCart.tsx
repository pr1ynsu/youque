import "../../styles/usercart.css";
import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  onSnapshot,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  CircleMarker
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function UserCart() {

  const [routes, setRoutes] = useState<any[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  const [picker, setPicker] = useState<"from" | "to" | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [carts, setCarts] = useState<any[]>([]);
  const [filteredCarts, setFilteredCarts] = useState<any[]>([]);

  const [routeCoords, setRouteCoords] = useState<any[]>([]);
  const [selectedCart, setSelectedCart] = useState<any>(null);

  // 🔥 LOAD ROUTES
  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "routes"));
      setRoutes(snap.docs.map(d => d.data()));
    };
    load();
  }, []);

  // 🔥 LIVE CARTS (SAFE DATA)
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "carts"), (snap) => {
      const data = snap.docs.map(d => {
        const val: any = d.data();

        return {
          id: d.id,
          ...val,
          location: {
            lat: Number(val?.location?.lat),
            lng: Number(val?.location?.lng)
          }
        };
      });

      setCarts(data);
    });

    return () => unsub();
  }, []);

  // 🔥 SAFE ROUTE MAPPING (NO CRASH)
  useEffect(() => {
    if (!selectedRoute) return;

    const load = async () => {
      const campusSnap = await getDocs(collection(db, "campuses"));

      const campusMap: any = {};

      campusSnap.docs.forEach(doc => {
        const d = doc.data();
        if (!d.location) return;

        const key = d.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .trim();

        const lat = Number(d.location.latitude);
        const lng = Number(d.location.longitude);

        if (!isNaN(lat) && !isNaN(lng)) {
          campusMap[key] = [lat, lng];
        }
      });

      const coords: any[] = [];

      selectedRoute.stops.forEach((stop: string) => {
        const key = stop
          .toLowerCase()
          .replace(/\s+/g, "")
          .trim();

        const match = campusMap[key];

        if (!match) {
          console.warn("Missing campus:", stop);
          return;
        }

        const lat = Number(match[0]);
        const lng = Number(match[1]);

        if (!isNaN(lat) && !isNaN(lng)) {
          coords.push([lat, lng]);
        }
      });

      if (coords.length < 1) {
        setRouteCoords([]);
        return;
      }

      setRouteCoords(coords);
    };

    load();
  }, [selectedRoute]);

  // 🔥 FILTER CARTS
  useEffect(() => {
    if (!selectedRoute) return;

    const valid = carts.filter(
      c =>
        c.route &&
        c.route.toLowerCase() === selectedRoute.name.toLowerCase()
    );

    setFilteredCarts(valid);
  }, [carts, selectedRoute]);

  // 🔥 BOOK
  const handleBook = async (cart: any) => {
    await updateDoc(doc(db, "carts", cart.id), {
      seats: Math.max((cart.seats || 1) - 1, 0)
    });

    setSelectedCart(cart);
  };

  return (
    <div className="cart-root">

      {/* PANEL */}
      <div className="cart-panel">

        <h2 className="cart-title">Find Your Ride</h2>

        {/* ROUTES */}
        <div className="route-select">
          {routes.map((r, i) => (
            <button
              key={i}
              className={selectedRoute?.name === r.name ? "active" : ""}
              onClick={() => {
                setSelectedRoute(r);
                setFrom("");
                setTo("");
              }}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* FROM / TO */}
        <div className="cart-route-box">
          <div className="route-pill" onClick={() => setPicker("from")}>
            <p>From</p>
            <span>{from || "Select Campus"}</span>
          </div>

          <div className="route-pill" onClick={() => setPicker("to")}>
            <p>To</p>
            <span>{to || "Select Campus"}</span>
          </div>
        </div>

        {/* LIST */}
        <div className="cart-list">
          {filteredCarts.map(cart => (
            <div key={cart.id} className="cart-card">

              <div className="cart-header">
                <h4>{cart.id}</h4>
                <span className={`status ${cart.status}`}>
                  {cart.status}
                </span>
              </div>

              <div className="cart-meta-row">
                <span>{cart.seats} Seats</span>
                <span>{cart.timing}</span>
              </div>

              <button
                className="book-btn"
                onClick={() => handleBook(cart)}
              >
                Book Ride
              </button>

            </div>
          ))}
        </div>

      </div>

      {/* CONFIRMED */}
      {selectedCart && (
        <div className="confirmed-box">
          Ride Booked • {selectedCart.id} • {from} → {to}
        </div>
      )}

      {/* 🔥 MAP SAFE */}
      <div className="cart-map-frame">
        {routeCoords.length >= 1 && routeCoords[0] && (
          <MapContainer
            center={routeCoords[0]}
            zoom={16}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {routeCoords.length > 1 && (
              <Polyline positions={routeCoords} color="#0D4715" />
            )}

            {routeCoords.map((pos, i) =>
              pos && pos[0] && pos[1] ? (
                <CircleMarker key={i} center={pos} radius={6} />
              ) : null
            )}

            {filteredCarts.map(cart => {
              const lat = Number(cart?.location?.lat);
              const lng = Number(cart?.location?.lng);

              if (
                typeof lat !== "number" ||
                typeof lng !== "number" ||
                isNaN(lat) ||
                isNaN(lng)
              ) {
                return null;
              }

              return (
                <Marker
                  key={cart.id}
                  position={[lat, lng]}
                />
              );
            })}
          </MapContainer>
        )}
      </div>

      {/* PICKER */}
      {picker && selectedRoute && (
        <div className="center-backdrop" onClick={() => setPicker(null)}>
          <div className="center-sheet" onClick={(e) => e.stopPropagation()}>
            <h4>Select Campus</h4>

            {selectedRoute.stops.map((c: string) => (
              <div
                key={c}
                className="picker-option"
                onClick={() => {
                  picker === "from" ? setFrom(c) : setTo(c);
                  setPicker(null);
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}