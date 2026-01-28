import { useEffect } from "react";
import { db } from "../firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

export default function Driver() {

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(async pos => {
        await updateDoc(doc(db,"carts","cart_01"),{
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          updatedAt: serverTimestamp()
        });
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return <h2>Driver GPS Active</h2>;
}
