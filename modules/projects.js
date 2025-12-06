require("dotenv").config();
require("pg");
const Sequelize = require("sequelize");

let sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
  }
);

const Sector = sequelize.define("Sector", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sector_name: Sequelize.STRING,
});

const Project = sequelize.define("Project", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: Sequelize.STRING,
  feature_img_url: Sequelize.STRING,
  summary_short: Sequelize.TEXT,
  intro_short: Sequelize.TEXT,
  impact: Sequelize.TEXT,
  original_source_url: Sequelize.STRING,
});

Project.belongsTo(Sector, { foreignKey: "sector_id" });

function initialize() {
  return sequelize.sync();
}

function getAllProjects() {
  return Project.findAll({ include: [Sector] });
}

function getProjectById(projectId) {
  return Project.findAll({
    include: [Sector],
    where: { id: projectId },
  }).then((projects) => {
    if (projects.length > 0) {
      return projects[0];
    } else {
      throw "Unable to find requested project";
    }
  });
}

function getProjectsBySector(sector) {
  return Project.findAll({
    include: [Sector],
    where: {
      "$Sector.sector_name$": {
        [Sequelize.Op.iLike]: `%${sector}%`,
      },
    },
  }).then((projects) => {
    if (projects.length > 0) {
      return projects;
    } else {
      throw "Unable to find requested projects";
    }
  });
}

function addProject(projectData) {
  return Project.create(projectData)
    .then(() => {
      return Promise.resolve();
    })
    .catch((err) => {
      return Promise.reject(err.errors[0].message);
    });
}

function editProject(id, projectData) {
  return Project.update(projectData, {
    where: { id: id },
  })
    .then(() => {
      return Promise.resolve();
    })
    .catch((err) => {
      return Promise.reject(err.errors[0].message);
    });
}

function deleteProject(id) {
  return Project.destroy({
    where: { id: id },
  })
    .then(() => {
      return Promise.resolve();
    })
    .catch((err) => {
      return Promise.reject(err.errors[0].message);
    });
}

module.exports = {
  initialize,
  getAllProjects,
  getProjectById,
  getProjectsBySector,
  addProject,
  editProject,
  deleteProject,
};
/*
const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");
let projects = [];

sequelize
  .sync()
  .then(async () => {
    try {
      await Sector.bulkCreate(sectorData);
      await Project.bulkCreate(projectData);

      await sequelize.query(
        `SELECT setval(pg_get_serial_sequence('"Sectors"', 'id'), (SELECT MAX(id) FROM "Sectors"))`
      );
      await sequelize.query(
        `SELECT setval(pg_get_serial_sequence('"Projects"', 'id'), (SELECT MAX(id) FROM "Projects"))`
      );

      console.log("-----");
      console.log("data inserted successfully");
    } catch (err) {
      console.log("-----");
      console.log(err.message);

      // NOTE: If you receive the error:

      // insert or update on table "Projects" violates foreign key constraint "Projects_sector_id_fkey"
      // it is because you have a "project" in your collection that has a "sector_id" that does not exist in "sectorData".
      // To fix this, use PgAdmin to delete the newly created "Sectors" and "Projects" tables, fix the error in your .json files and re-run this code
    }

    process.exit();
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });
*/
