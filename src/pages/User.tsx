import "../styles/user.css";
import { useAuth } from "../context/AuthContext";
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function User() {
  const { user } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    roll: "",
    university: "",
    hostel: "",
    email: user?.email || "",
    userType: "student",
  });

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setForm(snap.data() as any);
    };
    load();
  }, [user]);

  const save = async () => {
    if (!user) return;
    await setDoc(doc(db, "users", user.uid), form, { merge: true });
    alert("Profile updated successfully");
  };

  return (
    <div className="user-backdrop">
      <div className="user-sheet">
        <div className="user-handle" />

        <div className="user-header">
          <div className="user-logo-circle">Q</div>
          <span>YouQue</span>
        </div>

        <h3>Your Profile</h3>

        <div className="user-inputs">

          <div className="user-row">
            <span>Name</span>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
            />
          </div>

          <div className="user-row">
            <span>Roll No</span>
            <input
              value={form.roll}
              onChange={e => setForm({ ...form, roll: e.target.value })}
              placeholder="Roll number"
            />
          </div>

          <div className="user-row">
            <span>University</span>
            <input
              value={form.university}
              onChange={e => setForm({ ...form, university: e.target.value })}
              placeholder="University"
            />
          </div>

          <div className="user-row">
            <span>Hostel</span>
            <input
              value={form.hostel}
              onChange={e => setForm({ ...form, hostel: e.target.value })}
              placeholder="Hostel"
            />
          </div>

          <div className="user-row">
            <span>Email</span>
            <input value={form.email} disabled />
          </div>

          <div className="user-row">
            <span>Type</span>
            <select
              value={form.userType}
              onChange={e => setForm({ ...form, userType: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="staff">Staff</option>
            </select>
          </div>

        </div>

        <button className="user-btn" onClick={save}>Save Changes</button>

        <p
          className="user-logout"
          onClick={() => signOut(auth).then(() => nav("/home"))}
        >
          Log out / Switch account
        </p>
      </div>
    </div>
  );
}
