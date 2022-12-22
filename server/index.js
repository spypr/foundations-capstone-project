const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

const {
  seed,
  getResorts,
  getTrails,
  newTrail,
  changeType,
  deleteTrail,
} = require("./controller");

app.use(express.json());
app.use(cors());

app.post("/seed", seed);
app.get("/resorts", getResorts);
app.get("/trails", getTrails);

app.post("/api/trail", newTrail);
app.put("/api/trail/:id", changeType);
app.delete("/api/trail/:id", deleteTrail);

app.listen(4000, () => console.log("Server running on 4000"));
