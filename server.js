/********************************************************************************
 * WEB322 – Assignment 03
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 *
 * Name: ___Irfan__Farid_________ Student ID: _126930247___ Date: __Dec_5th_2025__
 *
 * Published URL:
 *
 ********************************************************************************/

require("dotenv").config();
const clientSessions = require("client-sessions");
const projectData = require("./modules/projects");
const path = require("path");
const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(
  clientSessions({
    cookieName: "session",
    secret: process.env.SESSIONSECRET,
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5,
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/solutions/projects", async (req, res) => {
  try {
    if (req.query.sector) {
      let projects = await projectData.getProjectsBySector(req.query.sector);
      projects.length > 0
        ? res.render("projects", { projects: projects })
        : res.status(404).render("404", {
            message: `No projects found for sector: ${req.query.sector}`,
          });
    } else {
      let projects = await projectData.getAllProjects();
      res.render("projects", { projects: projects });
    }
  } catch (err) {
    res.status(404).render("404", { message: err });
  }
});

app.get("/solutions/projects/:id", async (req, res) => {
  try {
    let project = await projectData.getProjectById(req.params.id);
    res.render("project", { project: project });
  } catch (err) {
    res.status(404).render("404", { message: err });
  }
});

app.get("/solutions/addProject", ensureLogin, (req, res) => {
  res.render("addProject");
});

app.post("/solutions/addProject", ensureLogin, (req, res) => {
  projectData
    .addProject(req.body)
    .then(() => {
      res.redirect("/solutions/projects");
    })
    .catch((err) => {
      res.render("500", {
        message: `I'm sorry, but we have encountered the following error: ${err}`,
      });
    });
});

app.get("/solutions/editProject/:id", ensureLogin, (req, res) => {
  projectData
    .getProjectById(req.params.id)
    .then((project) => {
      res.render("editProject", { project: project });
    })
    .catch((err) => {
      res.status(404).render("404", { message: err });
    });
});

app.post("/solutions/editProject", ensureLogin, (req, res) => {
  projectData
    .editProject(req.body.id, req.body)
    .then(() => {
      res.redirect("/solutions/projects");
    })
    .catch((err) => {
      res.render("500", {
        message: `I'm sorry, but we have encountered the following error: ${err}`,
      });
    });
});

app.get("/solutions/deleteProject/:id", ensureLogin, (req, res) => {
  projectData
    .deleteProject(req.params.id)
    .then(() => {
      res.redirect("/solutions/projects");
    })
    .catch((err) => {
      res.render("500", {
        message: `I'm sorry, but we have encountered the following error: ${err}`,
      });
    });
});

app.get("/login", (req, res) => {
  res.render("login", { errorMessage: "", userName: "" });
});

app.post("/login", (req, res) => {
  if (
    req.body.userName === process.env.ADMINUSER &&
    req.body.password === process.env.ADMINPASSWORD
  ) {
    req.session.user = {
      userName: process.env.ADMINUSER,
    };
    res.redirect("/solutions/projects");
  } else {
    res.render("login", {
      errorMessage: "Invalid User Name or Password",
      userName: req.body.userName,
    });
  }
});

app.get("/logout", (req, res) => {
  req.session.reset();
  res.redirect("/");
});

app.use((req, res, next) => {
  res.status(404).render("404", {
    message: "I'm sorry, we're unable to find what you're looking for",
  });
});

projectData.initialize().then(() => {
  app.listen(HTTP_PORT, () => {
    console.log(`server listening on: ${HTTP_PORT}`);
  });
});
