import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schemaUsers = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const UserModel = model('User', schemaUsers);

export default UserModel;
