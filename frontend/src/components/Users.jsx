import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const users1 = response.data.users.filter((user) => {
          return user.lastName !== "bills"
        });
        const finalUsers = users1.filter((user) => {
          return user.lastName !== "bank"
        })

        setUsers(finalUsers);
      })

  }, [filter]);

  return (
    <>
      <div style={styles.heading}>Users</div>
      <div style={styles.inputContainer}>
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          style={styles.input}
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} navigate={navigate} />
        ))}
      </div>
    </>
  );
};


function User({ user, navigate }) {
  return (
    <div style={styles.userContainer}>
      <div style={styles.userDetails}>
        <div style={styles.avatar}>
          <div style={styles.avatarText}>{user.firstName[0]}</div>
        </div>
        <div>{user.firstName} {user.lastName}</div>
      </div>
      <div>
        <Button
          onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}

const styles = {
  heading: {
    fontWeight: "bold",
    fontSize: "1.125rem",
    marginTop: "1.5rem",
    marginBottom: "0.5rem",
  },
  inputContainer: {
    marginTop: "0.5rem",
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #CBD5E0",
    borderRadius: "0.25rem",
  },
  userContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
  },
  userDetails: {
    display: "flex",
  },
  avatar: {
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    backgroundColor: "#CBD5E0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "0.5rem",
  },
  avatarText: {
    fontSize: "1.5rem",
  },
};
