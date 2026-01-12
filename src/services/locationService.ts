import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export async function fetchCityData(city: string) {
  const ref = doc(db, "cities", city.toLowerCase());
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data();
}
