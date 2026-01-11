import "../styles/authSheet.css";
import google from "../assets/google.png";
import apple from "../assets/apple.png";
import facebook from "../assets/facebook.png";

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
  if (!open) return null;

  return (
    <div className="auth-backdrop" onClick={onClose}>
      <div className="auth-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="auth-handle" />

        <div className="auth-header">
          <div className="auth-logo-circle">Q</div>
          <span>YouQue</span>
        </div>

        <h3>{mode === "signin" ? "Login to your account" : "Create your account"}</h3>

        <div className="auth-inputs">
          <input placeholder="Email" />
          <input type="password" placeholder="Password" />
        </div>

        <button className="auth-btn">
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </button>

        <p className="auth-or">
          — or {mode === "signin" ? "sign in" : "sign up"} with —
        </p>

        <div className="auth-socials">
          <img src={google} />
          <img src={facebook} />
          <img src={apple} />
        </div>

        <p className="auth-switch" onClick={onSwitch}>
          {mode === "signin" ? (
            <>
              Don’t have an account ?{" "}
              <span className="auth-highlight">Sign Up</span>
            </>
          ) : (
            <>
              Already have an account ?{" "}
              <span className="auth-highlight">Sign In</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
