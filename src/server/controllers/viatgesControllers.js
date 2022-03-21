const Viatge = require("../../db/models/Viatge");
const Usuari = require("../../db/models/Usuari");
const debug = require("debug")("pallars:createViatge");

const getViatgesCrono = async (req, res) => {
  const viatgesUnordered = await Viatge.find();
  const viatges = await viatgesUnordered.sort(
    (a, b) => a.dataNumber - b.dataNumber
  );
  res.json({ viatges });
};

const deleteViatge = async (req, res, next) => {
  const { id } = req.params;
  try {
    const viatgeToDelete = await Viatge.findByIdAndDelete(id);
    if (viatgeToDelete) {
      res.json({});
    } else {
      const error = new Error("Could not find the Trip");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const getThisViatge = async (req, res, next) => {
  const { id } = req.params;
  try {
    const trip = await Viatge.findById(id);
    if (trip) {
      res.json({ trip });
    } else {
      const error = new Error("Could not find the Trip");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const createViatge = async (req, res, next) => {
  try {
    const toCreateViatge = req.body;
    toCreateViatge.horaSortidaNumber = toCreateViatge.horaSortida.replace(
      /:/g,
      ""
    );
    toCreateViatge.dataNumber = toCreateViatge.data.replace(/-/g, "");
    parseInt(toCreateViatge.horaSortidaNumber, 10);
    parseInt(toCreateViatge.dataNumber, 10);
    const createdViatge = await Viatge.create(toCreateViatge);
    const user = await Usuari.findById(req.userId);
    debug(req.userId);
    debug(createdViatge.id);
    user.viatges.push(createdViatge.id);
    res.status(201).json(createdViatge);
  } catch (error) {
    const newError = new Error("Viatge invàlid o incorrecte");
    newError.status = 400;
    next(newError);
  }
};

module.exports = { getViatgesCrono, deleteViatge, createViatge, getThisViatge };
