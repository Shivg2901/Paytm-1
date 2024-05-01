import { useEffect, useState } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";

export const History = () => {
    const [transactions, setTransactions] = useState([]);

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
        transaction: {
            marginBottom: "1rem",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
        },
        transactionDetail: {
            marginBottom: "0.5rem",
        },
    };

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/account/history", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setTransactions(response.data.transactions);
            })
            .catch((error) => {
                console.error("Error fetching transactions:", error);
            });
    }, []);

    return (
        <>
            <Appbar />
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.header}>Transaction History</div>
                    {transactions.map((transaction, index) => (
                        <div key={index} style={styles.transaction}>
                            <div style={styles.transactionDetail}>
                                From: {transaction.from}
                            </div>
                            <div style={styles.transactionDetail}>
                                To: {transaction.to}
                            </div>
                            <div style={styles.transactionDetail}>
                                Amount: {transaction.amount}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
