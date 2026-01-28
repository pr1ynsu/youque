import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export type Role = "student" | "driver" | "staff" | null;

type AuthContextType = {
  user: User | null;
  role: Role;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);

      if (currentUser) {
        try {
          const snap = await getDoc(doc(db, "users", currentUser.uid));

          if (snap.exists()) {
            const dbRole = snap.data().userType as Role;

            // ✅ only allowed roles
            setRole(dbRole ?? "student");
          } else {
            // ✅ default role
            setRole("student");
          }
        } catch {
          setRole("student");
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
