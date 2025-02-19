import { Router } from 'express';

const router = Router();

// Rota de exemplo
router.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo ao SemStress!' });
});

// Outra rota de exemplo
router.get('/status', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

export default router;
