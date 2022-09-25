// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Report } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Report[] | {error: string}>
) {
  if ( req.method !== 'GET') res.status(500).json({ error: 'incorrect method' })

  const queryLimit = req.query.limit ? Array.isArray(req.query.limit) ? ~~req.query.limit[0] : ~~req.query.limit : 5;

  const result = await prisma.report.findMany({take: queryLimit}).catch(() => {
    res.status(500).json({ error: 'data fetch failed' })
  })

  if (result) res.json(result);

  res.status(500).json({ error: 'data fetch failed' })
}
