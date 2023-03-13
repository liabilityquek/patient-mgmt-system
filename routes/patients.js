const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patient");
const {isAuth} = require("../controllers/users");

router.get("/new", isAuth, patientsController.newPatient);
router.post("/",  isAuth, patientsController.createPatient);
router.get("/lookup",  isAuth, patientsController.retrievePatient);
router.get("/show", isAuth, patientsController.showPatient);
router.put("/:nricfin", isAuth, patientsController.updatePatientProfile);
router.delete("/:nricfin", isAuth, patientsController.delPatientProfile);
router.post("/:nricfin", isAuth, patientsController.createPatientLog);
router.put("/:id/:log", isAuth, patientsController.updatePatientLog);
router.delete("/:id/:log", isAuth, patientsController.delPatientLog);

// router.get("/new", patientsController.newPatient);
// router.post("/", patientsController.createPatient);
// router.get("/lookup", patientsController.retrievePatient);
// router.get("/show", patientsController.showPatient);
// router.put("/:nricfin", patientsController.updatePatientProfile);
// router.delete("/:nricfin", patientsController.delPatientProfile);
// router.post("/:nricfin", patientsController.createPatientLog);
// router.put("/:id/:log", patientsController.updatePatientLog);
// router.delete("/:id/:log", patientsController.delPatientLog);

module.exports = router;
