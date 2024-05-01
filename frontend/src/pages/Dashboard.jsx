import React, { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

const styles = {
  container: {
    margin: "2rem",
  },
  loading: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  error: {
    fontSize: "1.25rem",
    color: "red",
    fontWeight: "bold",
  },
};

export const Dashboard = () => {
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {

    const value = localStorage.getItem("token");

    axios({
      method: "get",
      url: `http://localhost:3000/api/v1/account/balance`,
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
      .then((response) => {
        if (response.statusText === "OK") {
          setAccount(response.data.balance);
          setIsLoading(false);
          setIsError(false);
        } else {
          setIsLoading(false);
          setIsError(true);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        console.log(err);
      });
  }, []);


  return (
    <div style={styles.container}>
      <Appbar />
      {isLoading && <div style={styles.loading}>Loading...</div>}
      {isError && <div style={styles.error}>Error fetching balance</div>}
      {account && <Balance value={account.toString()} />}
      <Users />
    </div>
  );
};
