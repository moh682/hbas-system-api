import express, { Application, Request, Response, NextFunction } from 'express';

const router = express();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.send('Index API');
});

export default router;
