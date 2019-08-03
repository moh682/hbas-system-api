"use strict";
// import express, { NextFunction, Response, Request } from 'express';
// import colors from 'colors';
// const router = express();
// //! facade
// import {
//   // getAllUsers,
//   addUser
// } from '../facade/userFacade';
// //! interfaces
// import { IUser } from '../interfaces';
// // router.get('/', (req: Request, res: Response, nest: NextFunction) => {
// // 	res.send('something');
// // });
// // router.get('/all', async (req: Request, res: Response, nest: NextFunction) => {
// // 	let users: IUser[] = await getAllUsers();
// // 	res.json(users);
// // });
// router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
//   let { username, password, email } = req.body;
//   await addUser({ username, password, email })
//     .then((result) => {
//       res.json({ msg: `username: ${username}, email: ${email} - Created in Database` });
//     })
//     .catch((err) => {
//       let error: Error = err;
//       let code: number = 0;
//       try {
//         code = Number(error.message.split(' ')[1]);
//       } catch (error) { }
//       if (code === 1062) {
//         res.json({ msg: `Already exist` });
//       } else {
//         res.json({ msg: 'An error has occured' });
//       }
//     });
// });
// export default router;
