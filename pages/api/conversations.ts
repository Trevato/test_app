import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { id, messages } = req.body
    const { data, error } = await supabase
      .from('conversations')
      .insert([{ id, messages }])
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ data })
  } else if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ data })
  } else {
    res.status(405).end() // Method Not Allowed
  }
}