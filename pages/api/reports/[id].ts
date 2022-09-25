// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Report, Block } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma';
import ObjectID from 'bson-objectid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Report | Block | {error: string}>
) {
  const id = req.query.id ? typeof req.query.id === 'string' ? req.query.id : undefined : undefined

  if ( req.method === 'PUT') {
    const result = await prisma.report.update({where: {id}, data: {
      state: "CLOSED"
    }}).catch(() => {
      res.status(500).json({ error: 'report update failed' })
    })

    if (result) res.json(result);

    return res.status(500).json({ error: 'report update failed' })
  }

  if (req.method === 'PURGE') {
    const report = await prisma.report.update({where: {id}, data: {
      state: "BLOCKED"
    }}).catch(() => {
      res.status(500).json({ error: 'report update failed' })
    })

    if (report) {
      const block = await prisma.block.create({data: {
        id_: ObjectID(report.id).toHexString(),
        payload: report.payload
      }}).catch(() => {
        res.status(500).json({ error: 'block create failed' })
      })

      if (block) res.json(block);

      return res.status(500).json({ error: 'block create failed' })
    }

    res.status(500).json({ error: 'block failed' })
  }

  res.status(500).json({ error: 'incorrect method' })
}
