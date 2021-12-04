import type { NextApiResponse } from 'next'
import '@/lib/firebase_admin'
import { NextApiRequestWithUid } from '@/server/types'
import api from '@/middlewares/api'
import { getUser } from '@/repositories/users_repository'
import createGithubClient from '@/lib/github'
import { GitHubRepositoriesResponseData } from '@/models/response/github_response'
import { GitHubRepository } from '@/models/github/GitHubRepository'

const action = async (
  req: NextApiRequestWithUid,
  res: NextApiResponse<GitHubRepositoriesResponseData>
) => {
  const user = await getUser(req.uid)
  const client = createGithubClient(user.githubToken)

  const repositoriesResult = await client.repos.listForAuthenticatedUser({
    sort: 'updated',
    direction: 'desc',
    visibility: 'all',
    per_page: 100,
  })

  const repositories = repositoriesResult.data as GitHubRepository[]

  res.status(200).json({ repositories })
}

export default api(action, 'GET')
