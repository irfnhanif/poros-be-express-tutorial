import { Router } from 'express';
import postRoutes from './posts.routes'

const router = Router();

router.all("/posts", postRoutes);

export default router;
