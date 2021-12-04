import type { NextApiResponse } from 'next'
import '@/lib/firebase_admin'
import { NextApiRequestWithUid } from '@/server/types'
import api from '@/middlewares/api'
import { getUser } from '@/repositories/users_repository'
import createGithubClient from '@/lib/github'
import { GitHubCommit } from '@/models/github/GitHubCommit'
import { GitHubCommitsResponseData } from '@/models/response/github_response'

const action = async (
  req: NextApiRequestWithUid,
  res: NextApiResponse<GitHubCommitsResponseData>
) => {
  const user = await getUser(req.uid)
  const client = createGithubClient(user.githubToken)

  const commitsResult = await client.search.commits({
    q: `author:${user.screenName} user:${user.screenName}`,
    sort: 'committer-date',
    direction: 'desc',
    per_page: 100,
  })

  const commits = commitsResult.data.items as unknown as GitHubCommit[]

  res.status(200).json({ commits })
}

export default api(action, 'GET')
