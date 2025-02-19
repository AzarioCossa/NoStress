// src/routes/index.router.ts
import { Router, Request, Response } from 'express';
import HomeController from '../controllers/home.controller';	

const router = Router();
const home = new HomeController();

// Definindo uma rota de exemplo
router.get('/', (req: Request, res: Response) => {
  home.renderHome(req, res);
});


export default router;