export type User = {
  id: string
  githubToken: string
  screenName: string
  displayName: string | null
  photoURL: string
  ignoreCommitRepositoryIds: number[]
}
