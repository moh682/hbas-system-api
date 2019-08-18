import express, { Request, Response, NextFunction } from 'express';

const router = express();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
   res.send("API Documentation ...");
});

export default router;
