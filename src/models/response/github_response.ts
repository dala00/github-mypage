import { GitHubActivity } from '../github/GitHubActivity'
import { GitHubRepository } from '../github/GitHubRepository'

export type GitHubActivitiesResponseData = {
  activities: GitHubActivity[]
}

export type GitHubRepositoriesResponseData = {
  repositories: GitHubRepository[]
}
