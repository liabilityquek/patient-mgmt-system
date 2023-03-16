const request = require("supertest");
const app = require('../server');
const Patient = require('../models/patient');
const Users = require('../models/users');

//test for patient model
test("show validation error from data model for patients", async () => {
  const patientData = {
    nricfin: "1234A",
    name: "John Doe",
    contactno: "12345678",
    dob: "01/01/1990",
    gender: "MALE",
    nationality: "SINGAPORE",
    streetaddress: "123 Main St",
    postalcode: "123456",
    unitno: "#01-01",
    drugallergies: ["Penicillin"],
    vaccination: "YES",
    vaccinationtype: "PFIZER",
    log: [],
  };

  const res = await request(app).post("/patients").send(patientData);

  expect(res.statusCode).toBe(200);
  await expect(Patient.create(patientData)).rejects.toThrow(message);

});

 