import { useAuth } from "../context/AuthContext";
import UserCart from "./cart/UserCart";
import DriverCart from "./cart/DriverCart";

export default function Cart() {
  const { role } = useAuth();

  // brain of the system
  return role === "driver" ? <DriverCart /> : <UserCart />;
}
