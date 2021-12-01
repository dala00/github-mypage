import type { NextApiResponse } from 'next'
import '@/lib/firebase_admin'
import { auth } from 'firebase-admin'
import { Handler, NextApiRequestWithUid } from '@/server/types'

const authenticated =
  (handler: Handler) =>
  async (req: NextApiRequestWithUid, res: NextApiResponse) => {
    const authorization = req.headers.authorization
    const parts = authorization?.split(' ')

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      res.status(401).end()
      return
    }

    const idToken = parts[1]

    const decodedToken = await auth()
      .verifyIdToken(idToken)
      .catch((error) => {
        console.error(error)
        return null
      })

    if (!decodedToken) {
      res.status(401).end()
      return
    }

    req.uid = decodedToken.uid

    return handler(req, res)
  }

export default authenticated
