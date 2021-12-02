export type GitHubActivity = {
  id: string
  type: string
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
