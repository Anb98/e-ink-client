import { Router } from 'express';
import { handleCommand } from '../controllers/command.controller';

const router = Router();

router.post('/', handleCommand);

export default router;
