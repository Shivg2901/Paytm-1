export const Balance = ({ value }) => {
  return (
    <div style={styles.container}>
      <div style={styles.boldText}>Your balance</div>
      <div style={styles.amountText}>Rs {value}</div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: "1.125rem",
  },
  amountText: {
    marginLeft: "0.75rem",
    fontWeight: "600",
    fontSize: "1.125rem",
  },
};
