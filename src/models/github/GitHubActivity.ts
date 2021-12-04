export type GitHubActivityType =
  | 'DeleteEvent'
  | 'ForkEvent'
  | 'IssueCommentEvent'
  | 'PullRequestEvent'
  | 'WatchEvent'

export type GitHubActivityDeletePayload = {
  ref: string
  ref_type: string
}

export type GitHubActivityIssueCommentPayload = {
  action: string
  comment: { html_url: string }
  issue: { html_url: string; title: string }
}

export type GitHubActivityPullRequestPayload = {
  action: string
  pull_request: { html_url: string; title: string }
}

export type GitHubActivityWatchPayload = {
  action: string
}

export type GitHubActivity = {
  id: string
  type: GitHubActivityType
  actor: {
    id: number
    login: string
    display_login?: string
    gravatar_id: string
    url: string
    avatar_url: string
  }
  repo: {
    id: number
    name: string
    url: string
  }
  org?: {
    id: number
    login: string
    display_login?: string
    gravatar_id: string
    url: string
    avatar_url: string
  }
  payload: {}
  public: boolean
  created_at: string
}
