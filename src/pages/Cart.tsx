import { useAuth } from "../context/AuthContext";
import UserCart from "./cart/UserCart";
import DriverCart from "./cart/DriverCart";
import StaffCart from "./cart/StaffCart";

export default function Cart() {
  const { role } = useAuth();

  if (role === "driver") return <DriverCart />;
  if (role === "staff") return <StaffCart />;

  return <UserCart />;
}