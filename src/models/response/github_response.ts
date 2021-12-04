import { GitHubActivity } from '../github/GitHubActivity'
import { GitHubCommit } from '../github/GitHubCommit'
import { GitHubRepository } from '../github/GitHubRepository'

export type GitHubActivitiesResponseData = {
  activities: GitHubActivity[]
}

export type GitHubCommitsResponseData = {
  commits: GitHubCommit[]
}

export type GitHubRepositoriesResponseData = {
  repositories: GitHubRepository[]
}
