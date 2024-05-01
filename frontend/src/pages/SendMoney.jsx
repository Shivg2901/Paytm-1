import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  const styles = {
    container: {
      width: "400px",
      margin: "100px auto",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    card: {
      textAlign: "center",
    },
    header: {
      textAlign: "center",
      color: "#333",
      marginBottom: "1rem",
      fontSize: "1.5rem",
    },
    avatar: {
      backgroundColor: "#007bff",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    name: {
      marginLeft: "1rem",
      fontSize: "1.25rem",
      alignSelf: "center",
    },
    inputContainer: {
      marginBottom: "1rem",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
  };

  return (
    <>
      <Appbar />
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.header}>Send Money</div>
          <div style={{ display: "flex", marginBottom: "1rem" }}>
            <div style={styles.avatar}>
              <span style={{ fontSize: "1.25rem", color: "white" }}>
                {name[0].toUpperCase()}
              </span>
            </div>
            <div style={styles.name}>{name}</div>
          </div>
          <div style={styles.inputContainer}>
            <label htmlFor="amount" style={{ fontSize: "0.875rem" }}>
              Amount (in Rs)
            </label>
            <input
              onChange={(e) => {
                setAmount(parseInt(e.target.value));
              }}
              type="number"
              id="amount"
              style={styles.input}
              placeholder="Enter amount"
            />
          </div>
          <button
            onClick={() => {
              axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                  to: id,
                  amount,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              )
                .then(response => {
                  if (response.data.message === "Transfer successful") {
                    alert("Transaction successful!");
                  } else {
                    alert("Transaction failed: Try again later");
                  }
                })
                .catch(error => {
                  alert("Error occurred: " + error.message);
                });
            }}
            style={styles.button}
          >
            Initiate Transfer
          </button>

        </div>
      </div>
    </>
  );
};
