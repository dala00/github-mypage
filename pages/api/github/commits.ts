import type { NextApiResponse } from 'next'
import '@/lib/firebase_admin'
import { NextApiRequestWithUid } from '@/server/types'
import api from '@/middlewares/api'
import { getUser } from '@/repositories/users_repository'
import createGithubClient from '@/lib/github'
import { GitHubCommit } from '@/models/github/GitHubCommit'
import { GitHubCommitsResponseData } from '@/models/response/github_response'

type Query = {
  page: string
}

const action = async (
  req: NextApiRequestWithUid,
  res: NextApiResponse<GitHubCommitsResponseData>
) => {
  const { page } = req.query as Query
  const user = await getUser(req.uid)
  const client = createGithubClient(user.githubToken)

  const commitsResult = await client.search.commits({
    q: `author:${user.screenName} user:${user.screenName}`,
    sort: 'committer-date',
    direction: 'desc',
    per_page: 100,
    page: Number(page),
  })

  const commits = (
    commitsResult.data.items as unknown as GitHubCommit[]
  ).filter(
    (commit) => !user.ignoreCommitRepositoryIds.includes(commit.repository.id)
  )

  res.status(200).json({ commits })
}

export default api(action, 'GET')
