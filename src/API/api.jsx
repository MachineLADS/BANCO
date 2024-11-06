import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const user = await prisma.user.create({
        data: { username, password },
      });
      res.status(200).json(user);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}