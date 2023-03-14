const mongoose = require('mongoose');
const Patients = require('../models/patient');
const QueueNo = require('../models/queueno');
const User = require('../models/users');

const URL = process.env.DATABASE_URL;
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then((instance) =>
  console.log(`Connected to db: ${instance.connections[0].name}`)
  ).catch((error) => console.log('Connection failed!', error));

const db = mongoose.connection;
 
db.on('connected', function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

