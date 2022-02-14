import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import swal from "sweetalert";

import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import styles from "./Home.module.css";
import Header from "../Header/Header";
import Input from "../Input/Input";
import { updateProjects } from "../../Redux/actions";

function Home(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  if (Object.keys(user).length == 0) {
    navigate("/login");
  }

  const projects = useSelector((state) => state.projects);

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

  useEffect(() => {
    //updateStore();
  });

  function deleteProject(projectId) {
    swal({
      title: "Confirm",
      text: "Are you sure you want to delete this project?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:8000/deleteProject/${projectId}`)
          .then((response) => {
            if (response.data.success) {
              swal("Project has been deleted!", {
                icon: "success",
              });
              updateStore();
            } else {
              swal("Oops something went wrong!", {
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        swal("Deletion aborted!");
      }
    });
  }

  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.main}>
        <Input />
        <div className={styles.projects}>
          <table>
            <tr>
              <th>Project No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {projects.map((project, id) => {
              return (
                <tr>
                  <td>{id + 1}</td>
                  <td>{project.projectName}</td>
                  <td>{project.projectDesc}</td>
                  <td>
                    <AiFillEdit />
                  </td>
                  <td>
                    <MdDelete
                      onClick={() => deleteProject(project.projectId)}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
