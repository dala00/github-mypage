import type { NextApiResponse } from 'next'
import '@/lib/firebase_admin'
import { NextApiRequestWithUid } from '@/server/types'
import api from '@/middlewares/api'
import { getUser, updateUser } from '@/repositories/users_repository'
import { IgnoreRepositoryForCommitRequestData } from '@/models/request/user_request'

const action = async (
  req: NextApiRequestWithUid,
  res: NextApiResponse<{ result: boolean }>
) => {
  const { repositoryId } = req.body as IgnoreRepositoryForCommitRequestData
  const user = await getUser(req.uid)

  if (!user.ignoreCommitRepositoryIds.includes(repositoryId)) {
    const ignoreCommitRepositoryIds = [
      ...user.ignoreCommitRepositoryIds,
      repositoryId,
    ]
    await updateUser(req.uid, { ignoreCommitRepositoryIds })
  }

  res.status(200).json({ result: true })
}

export default api(action, 'POST')
