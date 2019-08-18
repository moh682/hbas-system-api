import express, { Request, Response, NextFunction } from 'express';
import AuthenticationService from '../services/AuthenticationService';
// import { ICreateUserInput } from '../interfaces/IUser';
// import logger from '../logger';
import { IUser } from '../interfaces/IUser';
const router = express();
const autheService = new AuthenticationService();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
   let { username, password } = req.body;
   let token: string | undefined;
   // token = await authenticationService.login(username, password);
   if (token !== undefined) {
      res.json({ token });
   } else {
      res.sendStatus(404);
   }
});

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
   let { password, email } = req.body;
   let user: IUser = {
      password, email
   }
   let token: string = "";
   token = await autheService.register(user).catch((error) => { console.log(error); return "" });
   if (token && token !== "") {
      res.json(token);
   } else {
      res.sendStatus(400);
   }
});

export default router;
