import express, { Application, Request, Response, NextFunction } from 'express';
import DBUserMapper from '../models/dataMappers/Users.Mapper';
import { IUser } from '../interfaces/IUser';

let UserMapper = new DBUserMapper();

const router = express();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
   let users = await UserMapper.getAllUSers();
   res.json(users);
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
   let { password, email } = req.body;
   let user: IUser = {
      password,
      email
   }
   UserMapper.addUser(user);
   res.sendStatus(200);
});

export default router;
