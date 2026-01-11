import { useAuth } from "../context/AuthContext";

export default function User() {
  const { user } = useAuth();

  return (
    <div style={{ padding: 30 }}>
      <h2>Welcome back</h2>
      <p>{user?.email}</p>
    </div>
  );
}
