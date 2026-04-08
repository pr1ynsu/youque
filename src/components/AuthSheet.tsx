import "../styles/authSheet.css";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function AuthSheet({
  mode,
  open,
  onClose,
  onSwitch,
}: {
  mode: "signin" | "signup";
  open: boolean;
  onClose: () => void;
  onSwitch: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // ✅ EMAIL AUTH (unchanged)
  const handleAuth = async () => {
    if (!email || !password) return alert("Please fill all fields");

    try {
      setLoading(true);

      if (mode === "signup") {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", res.user.uid), {
          email,
          campus: "",
          createdAt: serverTimestamp(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ GOOGLE AUTH (NEW)
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      await setDoc(
        doc(db, "users", res.user.uid),
        {
          email: res.user.email,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      onClose();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-backdrop" onClick={onClose}>
      <div className="auth-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="auth-handle" />

        <div className="auth-header">
          <div className="auth-logo-circle">Q</div>
          <span>YouQue</span>
        </div>

        <h3>
          {mode === "signin"
            ? "Login to your account"
            : "Create your account"}
        </h3>

        {/* ✅ EMAIL INPUTS (UNCHANGED) */}
        <div className="auth-inputs">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* ✅ EMAIL BUTTON */}
        <button className="auth-btn" onClick={handleAuth} disabled={loading}>
          {loading
            ? "Please wait..."
            : mode === "signin"
            ? "Sign In"
            : "Sign Up"}
        </button>

        {/* ✅ CLEAN TEXT SOCIAL OPTIONS */}
        <p className="auth-or">
          — or continue with —
        </p>

        <div className="auth-socials">
          <button className="auth-social-btn" onClick={handleGoogle}>
            Continue with Google
          </button>

          
        </div>

        <p className="auth-switch" onClick={onSwitch}>
          {mode === "signin" ? (
            <>
              Don’t have an account ?
              <span className="auth-highlight"> Sign Up</span>
            </>
          ) : (
            <>
              Already have an account ?
              <span className="auth-highlight"> Sign In</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}