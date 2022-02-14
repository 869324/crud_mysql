const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1886",
  database: "crud",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  const hash = crypto.createHash("sha256").update(password).digest("base64");
  const fetch = "select * from users where userName = ? and password = ?";

  db.query(fetch, [userName, hash], (err, result) => {
    console.log(err);
    console.log(result);
    if (result.length > 0) {
      res.send({
        success: true,
        userId: result[0].userId,
      });
    } else {
      res.send({ success: false });
    }
  });
});

app.post("/signup", (req, res) => {
  const firstName = req.body.firstName;
  const secondName = req.body.secondName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const password = req.body.password;

  const hash = crypto.createHash("sha256").update(password).digest("base64");

  const insert =
    "insert into users (firstName, lastName, secondName, userName, password) values (?, ?, ?, ?, ?)";
  const fetch =
    "select * from users where firstName = ? and secondName = ? and lastName = ?";

  db.query(
    fetch,
    [firstName, secondName, userName, lastName],
    (err, result) => {
      if (result.length > 0) {
        res.send({
          success: false,
          msg: "This user already exists!",
        });
      } else {
        db.query(
          insert,
          [firstName, secondName, lastName, userName, hash],
          (err, result) => {
            if (result.insertId) {
              res.send({ success: true, msg: "Sing up successful" });
            } else {
              res.send({ success: false, msg: "Something went wrong!" });
            }
          }
        );
      }
    }
  );
});

app.post("/addProject", (req, res) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const desc = req.body.desc;

  const insert =
    "insert into projects (userId, projectName, projectDesc) values (?, ?, ?)";

  db.query(insert, [userId, name, desc], (err, result) => {
    if (result.insertId) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  });
});

app.get("/getProjects/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = "select * from projects where userId = ?";
  db.query(query, [userId], (err, result) => {
    console.log(err);
    console.log(result);
    if (result.length > 0) {
      res.send({
        success: true,
        projects: result,
      });
    } else {
      res.send({
        success: false,
      });
    }
  });
});

app.delete("/deleteProject/:projectId", (req, res) => {
  const projectId = req.params.projectId;

  const query = "delete from projects where projectId = ?";

  db.query(query, [projectId], (err, result) => {
    if (err) res.send({ success: false });
    res.send({ success: true });
  });
});

app.put("/editProject", (req, res) => {
  const projectId = req.body.projectId;
  const name = req.body.name;
  const desc = req.body.description;

  const query =
    "update projects set projectName = ?, projectDesc = ? where projectId = ?";

  db.query(query, [name, desc, projectId], (err, result) => {
    if (err) res.send({ success: false });
    else res.send({ success: true });
  });
});

app.listen(8000, () => {
  console.log("server running");
});
