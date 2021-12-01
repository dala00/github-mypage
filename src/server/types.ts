import { NextApiRequest, NextApiResponse } from 'next'

export type NextApiRequestWithUid = NextApiRequest & { uid: string }

export type Handler = (req: NextApiRequest, res: NextApiResponse) => void
