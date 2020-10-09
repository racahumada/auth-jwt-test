import * as jwt from '../config/jwt.js';
import UserModel from '../models/UsersModel.js';

export const authMiddle = async (req, res, next) => {
  console.log('no middle: ', req.headers.authorization);
  const [_, token] = req.headers.authorization.split(' ');
  try {
    const payload = jwt.verify(token);
    const user = await UserModel.findById(payload.user);
    if (!user) {
      res.send(401);
    }
    req.auth = user;
    // res.send(user);
    next();
  } catch (err) {
    res.send(err);
  }
};
