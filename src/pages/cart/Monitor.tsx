import { useEffect, useState } from "react";
import safeRender from "../../../utils/safeRender";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import "../../styles/monitor.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Monitor() {
  const [carts, setCarts] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "carts"), (snap) => {
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCarts(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="monitor-root">

      <h3>Live Cart Monitoring</h3>

      <MapContainer
        center={[20.2961, 85.8245]}
        zoom={15}
        className="monitor-map"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {carts.map(cart =>
          cart.lat && (
            <Marker key={cart.id} position={[cart.lat, cart.lng]}>
              <Popup>
                🚗 {safeRender(cart.route)} <br />
                Status: {safeRender(cart.status)}
              </Popup>
            </Marker>
          )
        )}
      </MapContainer>

      {/* LIST */}
      <div className="monitor-list">
        {carts.map(cart => (
          <div key={cart.id} className="monitor-card">
            <p>{safeRender(cart.route)}</p>
            <span className={`status ${safeRender(cart.status)}`}>
              {safeRender(cart.status)}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}