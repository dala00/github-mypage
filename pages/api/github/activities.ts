import type { NextApiResponse } from 'next'
import '@/lib/firebase_admin'
import { NextApiRequestWithUid } from '@/server/types'
import api from '@/middlewares/api'
import { getUser } from '@/repositories/users_repository'
import createGithubClient from '@/lib/github'
import { GitHubActivitiesResponseData } from '@/models/response/github_response'
import { GitHubActivity } from '@/models/github/GitHubActivity'

const action = async (
  req: NextApiRequestWithUid,
  res: NextApiResponse<GitHubActivitiesResponseData>
) => {
  const user = await getUser(req.uid)
  const client = createGithubClient(user.githubToken)

  const activities = await client.activity.listReceivedEventsForUser({
    username: user.screenName,
    per_page: 100,
  })

  res.status(200).json({ activities: activities.data as GitHubActivity[] })
}

export default api(action, 'GET')
