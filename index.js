import express from 'express';
import db from './config/db.js';
import UserModel from './models/UsersModel.js';

import * as jwt from './config/jwt.js';

const server = express();
server.use(express.json());
db();

server.get('/', (req, res) => {
  res.status(200).send('Conectado com Sucesso');
});

server.post('/signup', async (req, res) => {
  try {
    const result = await UserModel.create(req.body);
    // user.password = undefined; Para não retornar o password como resultado
    const { password, ...user } = result.toObject();
    const token = jwt.sign({ user: user.id });

    //Retornando os dados de usuario e o token para validações
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

server.get('/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({ username, password });
    if (!user) {
      return res.status(401);
    }
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

server.listen(3000, () => {
  console.log('Server Rodando!');
});
