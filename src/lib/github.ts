import { Octokit } from 'octokit'

export default function createGithubClient(accessToken: string) {
  return new Octokit({ auth: accessToken }).rest
}
