import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

function passwordCheck(req, res, next) {
  console.log("Body:", req.body); // Debug print
  const { username, password } = req.body;
  if (username === "varun" && password === "varun@28") {
    req.userIsAuthorised = true;
  } else {
    req.userIsAuthorised = false;
  }
  next();
}

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", passwordCheck, (req, res) => {
  if (req.userIsAuthorised) {
    res.render("about.ejs");
  } else {
    res.render("index.ejs");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
