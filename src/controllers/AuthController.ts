import express, { Request, Response, NextFunction } from 'express';
import AuthenticationService from '../services/AuthenticationService';
import { IUser } from '../interfaces/IUser';
const router = express();
const autheService = new AuthenticationService();

const ALLOWED_ORIGINS = [
   'http://localhost:3000',
   'http://www.localhost:8000'
]

router.use((req: Request, res: Response, next: NextFunction) => {
   if (ALLOWED_ORIGINS.indexOf(req.headers.origin as string) > -1) {
      res.set('Access-Control-Allow-Credentials', 'true')
      res.set('Access-Control-Allow-Origin', req.headers["access-control-allow-origin"])
      next();
   } else {
      res.set('Access-Control-Allow-Credentials', '*')
      next()
   }
})

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
