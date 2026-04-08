import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import "../../styles/tracking.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Tracking() {
  const [carts, setCarts] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "carts"), (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setCarts(data);
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[20.2961, 85.8245]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {carts.map((c) =>
          c.location?.lat ? (
            <Marker
              key={c.id}
              position={[c.location.lat, c.location.lng]}
            >
              <Popup>
                🚗 {c.id} <br />
                {c.route || "No route"} <br />
                Status: {c.status}
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}