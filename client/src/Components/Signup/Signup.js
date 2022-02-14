import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import styles from "./Signup.module.css";

function Signup(props) {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:8000/signup", {
        firstName: firstName,
        secondName: secondName,
        lastName: lastName,
        userName: userName,
        password: password,
      })
      .then((response) => {
        if (response.data.success) {
          swal("Successful", response.data.msg, "success");
          navigate("/login");
        } else {
          swal("Failed", response.data.msg, "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          className={styles.input}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          className={styles.input}
          onChange={(e) => setSecondName(e.target.value)}
          placeholder="Second Name"
          required
        />
        <input
          className={styles.input}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
        <input
          className={styles.input}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="UserName"
          required
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="Password"
          required
        />
        <button>Submit</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Signup;
