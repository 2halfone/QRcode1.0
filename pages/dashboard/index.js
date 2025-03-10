import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { auth, signOut } from "../../utils/firebase";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../../styles/dashboard.module.css"; // Usa il CSS Module

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/auth/login");
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const handleUserActivity = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        router.replace("/auth/login");
      }, 3000); // 3 seconds of inactivity
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    handleUserActivity(); // Initialize the timer

    return () => {
      clearTimeout(timeoutRef.current);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/auth/login");
  };

  const handleDropdownSelect = (eventKey) => {
    // Handle the dropdown item selection
    setNotification("Notification sent successfully!");
    setTimeout(() => {
      router.replace("/auth/login");
    }, 2000); // 2 seconds of wait before redirecting
  };

  return (
    <div className={styles.container}>
      <div className={styles.dashboardBox}>
        <h1 className={`${styles.title} mb-4 text-center`}>
          Dashboard
        </h1>
        {user ? (
          <>
            <p className="mb-4 text-center" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Welcome, {user.displayName ? user.displayName : user.email.split('@')[0]}
            </p>
          </>
        ) : (
          <p className="text-center" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Loading...
          </p>
        )}
        <div className="d-flex justify-content-center align-items-center">
          <div className="bg-primary" style={{ width: 100, height: 100, cursor: 'pointer', borderRadius: '5px' }} />
        </div>
        <div className="d-flex justify-content-center align-items-center mt-4">
          <DropdownButton
            id="dropdown-basic-button"
            title="Select Action"
            className={styles.dropdownButton}
            onSelect={handleDropdownSelect}
            variant="primary"
            size="lg"
          >
            <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
            <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
            <Dropdown.Item eventKey="3">Action 3</Dropdown.Item>
            <Dropdown.Item eventKey="4">Action 4</Dropdown.Item>
          </DropdownButton>
        </div>
        {notification && (
          <div className="alert alert-success text-center mt-4">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
}
