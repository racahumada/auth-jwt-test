import express from 'express';
import db from './config/db.js';
import UserModel from './models/UsersModel.js';
//importando funções de token e verificação
import * as jwt from './config/jwt.js';
//importando funções para os middlewares
import * as middle from './middlewares/midllewares.js';

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
    //Gerando token
    const token = jwt.sign({ user: user.id });

    //Retornando os dados de usuario e o token para validações
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

server.get('/login', async (req, res) => {
  //Pegando os dados que vem do headers
  const dataLogin = req.headers.authorization;
  //Atribuindo as strings separadas
  const [_hashtype, hash] = dataLogin.split(' ');
  //Decodificando a hash e separando o username da senha
  const [username, password] = Buffer.from(hash, 'base64')
    .toString()
    .split(':');

  try {
    const user = await UserModel.findOne({ username, password });
    if (!user) {
      return res.status(401);
    }
    //Gerando token ao logar
    const token = jwt.sign({ user: user.id });
    res.send({ user, token });
  } catch (err) {
    res.send(err);
  }
});

server.use('/users', middle.authMiddle);
server.use('/me', middle.authMiddle);

server.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});
//usado na verificação de token
server.get('/me', (req, res) => {
  res.send(req.auth);
});

server.listen(3000, () => {
  console.log('Server Rodando!');
});
