import type { NextApiResponse } from 'next'
import '@/lib/firebase_admin'
import { NextApiRequestWithUid } from '@/server/types'
import api from '@/middlewares/api'
import { getUser } from '@/repositories/users_repository'
import { GetUserResponseData } from '@/models/response/user_response'

const action = async (
  req: NextApiRequestWithUid,
  res: NextApiResponse<GetUserResponseData>
) => {
  const user = await getUser(req.uid)

  res.status(200).json({ user })
}

export default api(action, 'GET')
