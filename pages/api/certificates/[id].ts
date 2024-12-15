import { NextApiRequest, NextApiResponse } from 'next'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query
      const result = await pool.query('SELECT * FROM certificates WHERE certificate_number = $1', [id])

      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0])
      } else {
        res.status(404).json({ error: 'Certificate not found' })
      }
    } catch (error) {
      console.error('Error retrieving certificate:', error)
      res.status(500).json({ error: 'Error retrieving certificate' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

