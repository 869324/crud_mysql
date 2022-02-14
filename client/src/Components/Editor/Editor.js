import styles from "./Editor.module.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import axios from "axios";

export default function Editor(props) {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState(props.project.name);
  const [name, setName] = useState(props.project.desc);

  function onSubmit(event) {
    event.preventDefault();

    axios
      .put("http://updateProject", {
        projectId: props.project.projectId,
        name: name,
        desc: desc,
      })
      .then((response) => {
        if (response.data.success) {
          props.setEditor(false);
          props.updateStore();
          swal("Task has been updated!", {
            icon: "success",
          });
        } else {
          swal("Failed, something went wrong!", {
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={styles.editor}>
      <div className={styles.content}>
        <button id={styles.closeBtn} onClick={() => props.setEditor(false)}>
          +
        </button>
        <h2>Edit task: {props.task.taskId}</h2>
        <form id={styles.form} onSubmit={onSubmit}>
          <input
            className={styles.input}
            value={desc}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className={styles.input}
            value={date}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <button id={styles.editBtn}>Edit</button>
        </form>
      </div>
    </div>
  );
}
