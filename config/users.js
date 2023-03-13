const mongoose = require('mongoose');
const User = require('../models/users');

//console.log('DATABASE_URL:', process.env.DATABASE_URL);
const URL = 'mongodb+srv://hrhquek:bENz%408488274809@harold.q6ieqkd.mongodb.net/users';
mongoose.connect(URL);
const db = mongoose.connection;
 
db.on('connected', function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
