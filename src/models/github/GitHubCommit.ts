export type GitHubCommit = {
  commit: {
    message: string
    committer: {
      date: string
    }
  }
  committer: {
    html_url: string
    login: string
  }
  html_url: string
  repository: {
    full_name: string
    html_url: string
  }
  sha: string
}
