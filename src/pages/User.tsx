import "../styles/user.css";
import { useAuth } from "../context/AuthContext";
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

type Role = "student" | "driver" | "staff";

export default function User() {
  const { user } = useAuth();
  const nav = useNavigate();

  /* sheet closing animation */
  const [closing, setClosing] = useState(false);

  /* role */
  const [role, setRole] = useState<Role>("student");

  /* form */
  const [form, setForm] = useState({
    name: "",
    email: user?.email || "",
    roll: "",
    university: "",
    hostel: "",
    cartNumber: "",
    routeNumber: "",
    userType: "student" as Role,
  });

  /* load firestore */
  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (!snap.exists()) return;

      const data = snap.data() as any;

      setForm((prev) => ({ ...prev, ...data }));
      setRole(data.userType || "student");
    };

    load();
  }, [user]);

  /* save */
  const save = async () => {
    if (!user) return;

    await setDoc(
      doc(db, "users", user.uid),
      { ...form, userType: role },
      { merge: true }
    );

    alert("Profile updated");
  };

  /* close with animation */
  const closeSheet = () => {
    setClosing(true);
    setTimeout(() => nav("/home"), 280);
  };

  const logout = async () => {
    await signOut(auth);
    nav("/home");
  };

  const isDriver = role === "driver";

  return (
    <div className="user-backdrop" onClick={closeSheet}>
      <div
        className={`user-sheet ${closing ? "closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="user-handle" />

        <div className="user-header">
          <div className="user-logo-circle">
            {isDriver ? "D" : "U"}
          </div>
          <span>{isDriver ? "Driver Profile" : "User Profile"}</span>
        </div>

        <div className="user-grid">

          <label>Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <label>Email</label>
          <input value={form.email} disabled />

          {!isDriver && (
            <>
              <label>Roll</label>
              <input
                value={form.roll}
                onChange={(e) => setForm({ ...form, roll: e.target.value })}
              />

              <label>University</label>
              <input
                value={form.university}
                onChange={(e) => setForm({ ...form, university: e.target.value })}
              />

              <label>Hostel</label>
              <input
                value={form.hostel}
                onChange={(e) => setForm({ ...form, hostel: e.target.value })}
              />
            </>
          )}

          {isDriver && (
            <>
              <label>Cart No</label>
              <input
                value={form.cartNumber}
                onChange={(e) => setForm({ ...form, cartNumber: e.target.value })}
              />

              <label>Route</label>
              <input
                value={form.routeNumber}
                onChange={(e) => setForm({ ...form, routeNumber: e.target.value })}
              />
            </>
          )}

          <label>Type</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="student">student</option>
            <option value="driver">driver</option>
            <option value="staff">staff</option>
          </select>
        </div>

        <button className="user-btn" onClick={save}>
          Save Changes
        </button>

        <p className="user-logout" onClick={logout}>
          Log out / Switch account
        </p>
      </div>
    </div>
  );
}
