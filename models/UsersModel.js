import mongoose from 'mongoose';
import crypto from 'crypto';
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
    //o set abaixo vai pegar o 'value' de password codificar md5
    //update vai atualizar o doc e o digest vai retorna em hexadecimal
    set: (value) => crypto.createHash('md5').update(value).digest('hex'),
  },
});

const UserModel = model('User', schemaUsers);

export default UserModel;
