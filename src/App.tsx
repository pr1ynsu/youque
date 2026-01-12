import { Routes, Route, Navigate } from "react-router-dom";
import Opening from "./pages/Opening";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import User from "./pages/User";
import Company from "./pages/Company";
import Customer from "./pages/Customer";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Opening />} />
      <Route path="/signin" element={<SignIn />} />

      <Route element={<Dashboard />}>
        <Route path="home" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="user" element={<User />} />
        <Route path="company" element={<Company />} />
        <Route path="customer" element={<Customer />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
