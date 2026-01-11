import { Routes, Route, Navigate } from "react-router-dom";
import Opening from "./pages/Opening";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";

function Company() {
  return <div style={{ padding: 40 }}>Company</div>;
}

function Customer() {
  return <div style={{ padding: 40 }}>Customer</div>;
}

function Social() {
  return <div style={{ padding: 40 }}>Social</div>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Opening />} />
      <Route path="/signin" element={<SignIn />} />

      {/* Layout wrapper */}
      <Route element={<Dashboard />}>
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/company" element={<Company />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/social" element={<Social />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
