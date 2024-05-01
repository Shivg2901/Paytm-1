import { Link } from "react-router-dom";


export const Appbar = () => {

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <Link to="/dashboard"> <div style={styles.appName}>PayTM App</div></Link>
      </div>
      <div style={styles.rightSection}>
        <Link to="https://funcinema-movie-booking-application.onrender.com">
          <button style={styles.button}>Book Movies</button>
        </Link>
        <Link to="/bank">
          <button style={styles.button}>Bank</button>
        </Link>
        <Link to="/bills">
          <button style={styles.button}>Pay Bills</button>
        </Link>
        <Link to="/history">
          <button style={styles.button}>See Transaction History</button>
        </Link>
        <Link to="/signup">
          <button style={styles.button}>Logout</button>
        </Link>
        <div style={styles.userIcon}>U</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    boxShadow: "0 2px rgba(0, 0, 0, 0.1)",
    height: "4rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
  },
  appName: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  button: {
    marginLeft: "1rem",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "0.3rem",
    backgroundColor: "#4a90e2",
    color: "#ffffff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  userInfo: {
    marginRight: "1rem",
    display: "flex",
    alignItems: "center",
  },
  userIcon: {
    marginLeft: "1rem",
    borderRadius: "50%",
    height: "3rem",
    width: "3rem",
    backgroundColor: "#4a90e2",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
