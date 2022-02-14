import axios from "axios";
import swal from "sweetalert";
import { useDispatch } from "react-redux";

import styles from "./Input.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { updateProjects, updateStore } from "../../Redux/actions";

function Input(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  function updateStore() {
    axios
      .get(`http://localhost:8000/getProjects/${user.userId}`)
      .then((response) => {
        dispatch(updateProjects(response.data.projects));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:8000/addProject", {
        userId: user.userId,
        name: name,
        desc: desc,
      })
      .then((response) => {
        if (response.data.success) {
          swal("Successful", "Project has been added!", "success");
          updateStore();
        } else {
          swal("Failed", "Failed to add project!", "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <form onSubmit={onSubmit}>
      <input
        className={styles.input}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project Name"
        required
      />
      <input
        className={styles.input}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Project Description"
        required
      />
      <button>Add</button>
    </form>
  );
}

export default Input;
