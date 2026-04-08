import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import "../../styles/tracking.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Tracking() {
  const [carts, setCarts] = useState<any[]>([]);

  useEffect(()=>{
    const unsub = onSnapshot(collection(db,"carts"),snap=>{
      setCarts(snap.docs.map(d=>({id:d.id,...d.data()})));
    });
    return ()=>unsub();
  },[]);

  return (
    <MapContainer center={[20.2961,85.8245]} zoom={15} className="map">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      {carts.map(c=>c.lat && (
        <Marker key={c.id} position={[c.lat,c.lng]}>
          <Popup>{c.route}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}