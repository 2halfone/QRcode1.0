import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/auth/login"); // ✅ Se non loggato, rimandalo alla login
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Impostazioni</h1>
      {user ? (
        <>
          <p>Benvenuto, {user.displayName || user.email}</p>
          <p>Questa è la pagina delle impostazioni.</p>
        </>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
}
