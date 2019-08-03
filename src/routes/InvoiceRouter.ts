import express, { Request, Response, NextFunction } from 'express';
let router = express.Router();

router.get('/', (request: Request, response: Response, next: NextFunction) => {
   response.send('You are authenticated. Welcome');
})

router.post('/add', (request: Request, response: Response, next: NextFunction) => {
   // get token name
   request.headers['hbas_authentication']
})

// router.get('/all', (request: Request, response: Response, next: NextFunction) => {
// });

export default router;