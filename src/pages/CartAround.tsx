import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function CartAround() {
  const [drivers, setDrivers] = useState<any>({});

  useEffect(() => {
    socket.on("updateDrivers", (data) => {
      setDrivers(data);
    });
  }, []);

  return (
    <div>
      <h2>Nearby Carts</h2>
      {Object.values(drivers).map((d: any) => (
        <div key={d.driverId}>
          🚗 {d.driverId} → {d.lat}, {d.lng}
        </div>
      ))}
    </div>
  );
}