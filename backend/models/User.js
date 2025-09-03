
// // module.exports = mongoose.model('User', userSchema);
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, enum: ['user', 'provider', 'admin'], default: 'user' }
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);
// Importing mongoose library to define schema and model
const mongoose = require('mongoose');

// Creating a new schema for the User collection
const userSchema = new mongoose.Schema({

  // 'name' field of type String
  name: String,

  // 'email' field of type String, must be unique (no two users with same email)
  email: { type: String, unique: true },

  // 'password' field of type String (will be stored as hashed password)
  password: String,

  // 'role' field to define user type: either user, provider, or admin
  // Default value is 'user'
  role: {
    type: String,
    enum: ['user', 'provider', 'admin'],  // allowed values
    default: 'user'
  }

  // Enables automatic creation of `createdAt` and `updatedAt` timestamps
}, { timestamps: true });

// Exporting the User model so it can be used in other parts of the app
// This will create a MongoDB collection named 'users'
module.exports = mongoose.model('User', userSchema);
