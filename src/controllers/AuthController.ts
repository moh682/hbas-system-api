import express, { Request, Response, NextFunction } from 'express';
import AuthenticationService from '../services/AuthenticationService';
import { IUser } from '../interfaces/IUser';
const router = express();
const autheService = new AuthenticationService();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
   let { email, password } = req.body;
   let user: IUser = {
      email, password
   }
   let token: string | undefined;
   token = await autheService.login(user).catch((error) => { return "" });
   if (token !== undefined && token !== "") {
      res.json({ token, user: { email } });
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
   token = await autheService.register(user).catch((error) => { console.log('error: ', error); return "" });
   if (token && token !== "") {
      res.json({ token, user: { email } });
   } else {
      res.sendStatus(400);
   }
});

export default router;
