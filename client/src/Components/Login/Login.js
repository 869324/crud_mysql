import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import swal from "sweetalert";

import styles from "./Login.module.css";
import { login } from "../../Redux/actions";

function Login(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:8000/login", {
        userName: userName,
        password: password,
      })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            login({
              userName: userName,
              userId: response.data.userId,
            })
          );

          swal("Successful", "Login successful!", "success");

          navigate("/");
        } else {
          swal("Failed", "Login failed! Check Credentials", "error");
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
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter Username"
        />
        <input
          className={styles.input}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
        <button>Login</button>
      </form>
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default Login;
