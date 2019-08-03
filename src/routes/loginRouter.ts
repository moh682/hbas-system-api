import express, { Request, Response, NextFunction } from 'express';
import { login, register } from '../authentication/AuthenticationService';
import { IUser, ICreateUserInput } from '../interfaces/IUser';
import logger from '../logger';
const router = express();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
   let { username, password } = req.body;
   let token: string | undefined;
   token = await login(username, password);
   console.log('inside route, token: ', token);
   if (token !== undefined) {
      res.json({ token });
   } else {
      res.sendStatus(404);
   }
});

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
   let user: ICreateUserInput = {
      password: req.body.password,
      username: req.body.username,
      email: req.body.email
   }
   let token: string | undefined = undefined;
   token = await register(user).catch((err) => { logger.error(err); return undefined });
   if (token) {
      res.json(token);
   } else {
      res.sendStatus(400);
   }
})

export default router;
