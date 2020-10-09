import express from 'express';
import db from './config/db.js';
import User from './models/UsersModel.js';
import UserModel from './models/UsersModel.js';

const server = express();
server.use(express.json());
db();

server.get('/', (req, res) => {
  res.status(200).send('Conectado com Sucesso');
});

server.post('/signup', async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    user.password = undefined;
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

server.listen(3000, () => {
  console.log('Server Rodando!');
});
