import { Router } from 'express';
import healthcheckRouter from './healthcheck';
import imageRouter from './image';
import commandRouter from './command';

const router = Router();

router.use('/healthcheck', healthcheckRouter);
router.use('/image', imageRouter);
router.use('/command', commandRouter);

export default router;
