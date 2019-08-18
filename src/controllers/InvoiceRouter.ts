// import express, { Request, Response, NextFunction } from 'express';
// // import { getUserFromToken } from '../authentication/AuthenticationService';
// // import { addInvoiceToUser } from '../services/invoiceFacade';
// import { IInvoice } from '../interfaces/IInvoice';
// let router = express.Router();

// router.get('/', (request: Request, response: Response, next: NextFunction) => {
//    response.send('You are authenticated. Welcome');
// });

// router.post('/add', (request: Request, response: Response, next: NextFunction) => {
//    // get token name
//    console.log('inside invoice/add');
//    let body = request.body;
//    console.log('body ->', body);
//    let invoice: IInvoice;
//    let authToken: string = request.headers['hbas_authentication'] as string;
//    // let username = getUserFromToken(authToken);
//    console.log(username);
//    if (username !== "") {
//       invoice = {
//          hours: 3,
//          payments: [
//             {
//                date: new Date(),
//                method: 'cash',
//                price: 400
//             }
//          ],
//          price: 400
//       }
//       addInvoiceToUser(username, invoice);
//    }

// });

// export default router;