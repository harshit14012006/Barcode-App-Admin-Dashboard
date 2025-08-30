import React from "react";

const StaffDashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Staff Dashboard</h1>
      <p style={styles.text}>✨ Coming Soon...</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#fdfdfd",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#34495e",
  },
  text: {
    fontSize: "1.5rem",
    color: "#95a5a6",
    marginTop: "1rem",
  },
};

export default StaffDashboard;
