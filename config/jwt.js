import jwt from 'jsonwebtoken';

const { SECRET } = process.env;

//Função para gerar token com duração de 24h
export const sign = (payload) =>
  jwt.sign(payload, SECRET, { expiresIn: 86400 });

//Função para verificação de token
export const verify = (token) => jwt.verify(token, SECRET);
