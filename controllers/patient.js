const Patient = require("../models/patient");

const newPatient = (req, res) => {
  res.render("patients/new");
};

const directToHomePage = (req, res) => {
  res.render("patients");
};

const createPatient = async (req, res) => {

  try {

    if (req.body.drugallergies) {
      req.body.drugallergies = req.body.drugallergies.split(/\s*,\s*/);
    }

    const patient = new Patient({
      ...req.body,
    });

    const newPatient = await patient.save(); //update
    
    console.log(`newPatient: ${newPatient}`);

    res.redirect("/patients");
  } catch (err) {
    if (err.code === 11000) {
      console.log(`Duplicate error: ${err}`);
      res.render("patients/error", { message: "Duplicate record!" });
    } else if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      console.log(`Data Model Errors: ${errors}`);
      res.render("patients/error", { message: errors });
    } else {
      console.log(err);
      res.render("patients/error", { message: err });
    }
  }
};

const retrievePatient = async (req, res) => {
  try {
    const nricfin = req.query.nricfin;
    const patient = await Patient.findOne({ nricfin: nricfin }).exec();

    res.render("patients/lookup", {
      patients: [patient],
      nricfin: patient.nricfin,
      name: patient.name,
      contactno: patient.contactno,
      dobFormatted: patient.dobFormatted,
      gender: patient.gender,
      nationality: patient.nationality,
      streetaddress: patient.streetaddress,
      postalcode: patient.postalcode,
      unitno: patient.unitno,
      drugallergies: patient.drugallergies,
      vaccinated: patient.vaccinated,
      vaccinationtype: patient.vaccinationtype,
      patientLog: patient.log,
      createdAtFormatted: patient.createdAtFormatted,
    });
    console.log(`nricfin: ${nricfin}`);
  } catch (err) {
    console.log(`Error retrieving patient by nricfin: ${err}`);
    if (err) {
      res.render("patients/error", { message: "Invalid NRIC/FIN." });
    }
  }
};

const showPatient = async (req, res) => {
  try {
    const nricfin = req.query.nricfin;
    const patient = await Patient.findOne({ nricfin: nricfin }).exec();
    console.log(`nricfin: ${nricfin}`);

    res.render("patients/show", {
      patients: [patient],
      nricfin: patient.nricfin,
      name: patient.name,
      contactno: patient.contactno,
      dobFormatted: patient.dobFormatted,
      gender: patient.gender,
      nationality: patient.nationality,
      streetaddress: patient.streetaddress,
      postalcode: patient.postalcode,
      unitno: patient.unitno,
      drugallergies: patient.drugallergies,
      vaccinated: patient.vaccinated,
      vaccinationtype: patient.vaccinationtype,
      patientLog: patient.log,
      createdAtFormatted: patient.createdAtFormatted,
    });
  } catch (err) {
    console.log(`Error showing patient: ${err}`);
    res.render("patients/error", { message: "Patient does not exist." });
  }
};

const updatePatientProfile = async (req, res) => {
  const nricfin = req.params.nricfin;

  try {
    console.log(`nricfin: ${nricfin}`);
    console.log(req.body);
    const patientBody = req.body;
    const patient = await Patient.findOneAndUpdate(
      { nricfin: nricfin },
      patientBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.redirect(`/patients/show?nricfin=${nricfin}`);
  } catch (err) {
    console.log(`Error in updating: ${err}`);
    res.render("patients/error", {
      message: `Error in updating Patient info due to nricfin: ${nricfin} `,
    });
  }
};

const delPatientProfile = (req, res) => {
  console.log(req.params);
  const nricfin = req.params.nricfin;
  const id = req.params.id;
  console.log(`nricfin: ${nricfin}`);
  console.log(`id: ${id}`);
  Patient.findOneAndRemove({ nricfin: nricfin })
    .exec()
    .then(() => {
      res.redirect("/patients");
    });
};

const createPatientLog = async (req, res) => {
  const nricfin = req.params.nricfin;
  console.log(`nricfin: ${nricfin}`);

  try {
    const patients = await Patient.findOne({ nricfin: nricfin }).exec();
    patients.log.push(req.body);
    const savedPatientLog = await patients.save(); //update
    console.log(`savedReviews: ${savedPatientLog}`);
    res.redirect(`/patients/lookup?nricfin=${nricfin}`);
  } catch (err) {
    console.log(`Error creating patient log: ${err}`);
    res.render("patients/error", { message: "Unable to create patient log." });
  }
};

const delPatientLog = async (req, res) => {
  console.log(req.params);
  const log = req.params.log;
  const id = req.params.id;
  const nricfin = req.query.nricfin;
  console.log(`objectId: ${id}`);
  console.log(`logId: ${log}`);

  try {
    const patient = await Patient.findById(id).exec();
    const checkLog = patient.log;
    const logIndex = checkLog.indexOf(
      checkLog.find((logs) => logs._id.toString() === log)
    );
    if (logIndex === -1) {
      console.log(`Patient Log with ID ${log} not found`);
    } else {
      console.log(`logIndex: ${logIndex}`);
      checkLog.splice(logIndex, 1);
      await patient.save();
      console.log(`Patient Log with ID ${log} deleted successfully`);
      res.redirect(`/patients`);
    }
  } catch (err) {
    console.log(`Error deleting patient log with ID ${log}: ${err}`);
    res.render("patients/error", { message: "Unable to delete patient log." });
  }
};

const updatePatientLog = async (req, res) => {
  console.log(req.params);
  const log = req.params.log;
  const id = req.params.id;
  const nricfin = req.query.nricfin;
  console.log(`objectId: ${id}`);
  console.log(`logId: ${log}`);

  try {
    const patient = await Patient.findById(id).exec();
    const checkLog = patient.log;
    const logIndex = checkLog.indexOf(
      checkLog.find((logs) => logs._id.toString() === log)
    );
    if (logIndex === -1) {
      console.log(`Patient Log with ID ${log} not found`);
    } else {
      console.log(`logIndex: ${logIndex}`);
      checkLog[logIndex].content = req.body.content;
      await patient.save();
      console.log(`Log with ID ${log} updated successfully`);
      res.redirect(`/patients`);
    }
  } catch (err) {
    console.log(`Error updating Log with ID ${log}: ${err}`);
    res.render("patients/error", { message: "Unable to update patient log." });
  }
};

module.exports = {
  newPatient,
  createPatient,
  retrievePatient,
  createPatientLog,
  delPatientLog,
  updatePatientLog,
  showPatient,
  updatePatientProfile,
  delPatientProfile,
  directToHomePage,
};
