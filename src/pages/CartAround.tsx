import { useEffect, useState } from "react";
import safeRender from "../utils/safeRender";

export default function CartAround() {
  const [drivers, setDrivers] = useState<any>({});

  useEffect(() => {
    // socket.on("updateDrivers", (data) => {
    //   setDrivers(data);
    // });
    // Socket disabled - no backend running (404 spam fix)
  }, []);

  return (
    <div>
      <h2>Nearby Carts</h2>
      {Object.values(drivers).map((d: any) => (
        <div key={safeRender(d.driverId)}>
          🚗 {safeRender(d.driverId)} → {safeRender(d.lat)}, {safeRender(d.lng)}
        </div>
      ))}
    </div>
  );
}