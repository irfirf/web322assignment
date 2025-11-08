/********************************************************************************
 * WEB322 – Assignment 02
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Irfan Farid Student ID: 1144178 Date: November 7th 2025
 *
 ********************************************************************************/

const express = require("express");
const app = express();
app.set("view engine", "ejs");
const HTTP_PORT = process.env.PORT || 8080;
const projectData = require("./modules/project.js");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express.static("public"));

projectData
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () =>
      console.log(`server listening on: ${HTTP_PORT}`)
    );
  })
  .catch((err) => {
    console.log(`failed to initialize: ${err}`);
  });

app.get("/", (req, res) => res.render("home"));

app.get("/about", (req, res) => res.render("about"));

app.get("/solutions/projects/:id", (req, res) => {
  projectData
    .getProjectById(parseInt(req.params.id))
    .then((project) => {
      if (!project) {
        return res.status(404).render("404", {
          message: `Project with ID ${req.params.id} not found`,
        });
      }
      res.render("project", { project: project });
    })
    .catch((error) => {
      res.status(404).render("404", { message: error.message });
    });
});

app.use((req, res) =>
  res.status(404).render("404", {
    message: "I'm sorry, we're unable to find what you're looking for",
  })
);

app.get("/solutions/projects", (req, res) => {
  if (req.query.sector) {
    projectData
      .getProjectsBySector(req.query.sector)
      .then((projects) => {
        if (projects.length === 0) {
          return res.status(404).render("404", {
            message: `No projects found for sector: ${req.query.sector}`,
          });
        }
        res.render("projects", { projects: projects });
      })
      .catch((error) => {
        res.status(404).render("404", { message: error.message });
      });
  } else {
    projectData
      .getAllProjects()
      .then((projects) => {
        res.render("projects", { projects: projects });
      })
      .catch((error) => {
        res.status(500).render("404", { message: error.message });
      });
  }
});

/*app.get("/solutions/projects", (req, res) => {
    projectData.getAllProjects()
        .then(projects => {
            if (!projects || projects.length === 0) {
                return res.json({
                    error: "There was an issue with loading the project files"
                })
            }
            res.json(projects)
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

app.get("/solutions/projects/id-demo", (req, res) => {
    projectData.getProjectById(50)
        .then(projects => {
            if (!projects) {
                return res.json({
                    error: "ID does not exist. Please enter a valid ID."
                })
            }
            res.json(projects)
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

app.get("/solutions/projects/sector-demo", (req, res) => {
    projectData.getProjectsBySector("dudfdsfsfst")
        .then(projects => {
            if (projects.length === 0) {
                return res.json({
                    error: "There are no keywords that match the input. Please enter a valid keyword."
                })
            }
            res.json(projects)
        })
        .catch(error => {
            res.status(500).json({ error: error.message})
        })
})*/
