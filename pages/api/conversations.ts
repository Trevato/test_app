import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  conversations: { id: string, messages: { user: string, content: string }[] }[]
}

let conversations: Data['conversations'] = []

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { id, messages } = req.body
    conversations.push({ id, messages })
    res.status(200).json({ conversations })
  } else if (req.method === 'GET') {
    res.status(200).json({ conversations })
  } else {
    res.status(405).end() // Method Not Allowed
  }
}