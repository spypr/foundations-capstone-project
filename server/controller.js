let database = [];
let newId = 10;

require("dotenv").config();
const Sequelize = require("sequelize");

const { CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(
        `
          drop table if exists trails;
          drop table if exists resorts;

          CREATE TABLE resorts (
                resort_id SERIAL PRIMARY KEY, 
                name VARCHAR
                );

            CREATE TABLE trails (
                trail_id SERIAL PRIMARY KEY,
                name VARCHAR,
                resort_id INTEGER REFERENCES resorts(resort_id)
                );

                INSERT INTO resorts (name)
                values ('Deer Valley Resort'),
                ('Alta Ski Area');  

                INSERT INTO trails (name,resort_id)
                values ('Argus',1),
                ('Bandana',1),
                ('Banner',1),
                ('Dew Drop',1),
                ('Edgars Alley',1),
                ('Gemini',1),
                ('Hawkeye',1),
                ('Last Chance',1),
                ('Morning Star',1),
                ('Ottobahn',1),
                ('Rosebud',1),
                ('Silver Dollar',1),
                ('Supreme',1),
                ('Wizard',1),
                ('Woodside',1),
                ('Aggies Alley',2),
                ('Blitz',2),
                ('Watson Line',2),
                ('Eagles Nest',2),
                ('Lone Pine',2),
                ('Mambo',2),
                ('Tombstone',2),
                ('Rock Gully',2),
                ('Meadow',2),
                ('Main Street',2); 
                `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },
  getResorts: (req, res) => {
    sequelize
      .query(`SELECT * FROM resorts;`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log("error on get resorts", err));
  },
  getTrails: (req, res) => {
    sequelize
      .query(
        `SELECT tr.trail_id, tr.name AS trails, re.resort_id, re.name AS resorts
        FROM trails as tr
        JOIN resorts as re
        ON re.resort_id = tr.resort_id;`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log("get trails error", err));
  },
  newTrail: (req, res) => {
    let { name, trailType } = req.body;
    let newRun = {
      id: newId,
      name,
      trailType,
    };
    const newArr = database.filter(
      (ele) => !(name === ele.name && ele.trailType === trailType)
    );
    newArr.push(newRun);

    database = [...newArr];

    res.status(200).send(database);

    newId++;
  },
  deleteTrail: (req, res) => {
    let { id } = req.params;
    let index = database.findIndex((trailrun) => trailrun.id === +id);
    database.splice(index, 1);
    res.status(200).send(database);
  },
  changeType: (req, res) => {
    const { trailType } = req.body;
    const { id } = req.params;

    let index = database.findIndex((trailrun) => trailrun.id === +id);

    database[index].trailType = trailType;
    console.log(database[index]);

    res.status(200).send(database);
  },
};
