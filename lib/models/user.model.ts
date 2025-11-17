import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  // This is where you'll store the *hashed* password
  password: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Date,
    default: null,
  },
  image: String,
  // ... any other fields you want
});

const User = models.User || model('User', UserSchema);
export default User;