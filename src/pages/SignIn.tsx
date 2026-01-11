import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const nav = useNavigate();

  return (
    <div className="glass" style={{maxWidth:360, margin:"50px auto"}}>
      <h2>Login to your account</h2>
      <input placeholder="Email"/>
      <input placeholder="Password" type="password"/>
      <button onClick={() => nav("/dashboard")}>Sign In</button>
      <p onClick={() => nav("/signup")}>Don't have account? Sign Up</p>
    </div>
  );
}
