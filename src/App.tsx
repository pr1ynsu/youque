import { Routes, Route, Navigate } from "react-router-dom";
import Opening from "./pages/Opening";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import User from "./pages/User";
import Company from "./pages/Company";
import Customer from "./pages/Customer";
import CartAround from "./pages/CartAround";
import Detail from "./pages/Detail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Opening />} />
      <Route path="/signin" element={<SignIn />} />

      {/* Layout wrapper */}
      <Route element={<Dashboard />}>
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart-around" element={<CartAround />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/user" element={<User />} />
        <Route path="/company" element={<Company />} />
        <Route path="/customer" element={<Customer />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
