require("dotenv").config();
const express = require("express");
const {
  getViatgesCrono,
  getViatgesOrigen,
} = require("../controllers/viatgesControllers");

const router = express.Router();

router.get("/crono", getViatgesCrono);
router.get("/:origen", getViatgesOrigen);
router.delete("/:id", deleteTrip);

module.exports = router;
