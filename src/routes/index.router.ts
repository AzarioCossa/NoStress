// src/routes/index.router.ts
import { Router, Request, Response } from 'express';

const router = Router();

// Definindo uma rota de exemplo
router.get('/', (req: Request, res: Response) => {
  res.send('Bem-vindo ao SemStress!');
});


export default router;