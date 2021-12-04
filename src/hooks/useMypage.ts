import { atom, useRecoilState } from 'recoil'
import { GitHubActivity } from './../models/github/GitHubActivity'
import axios from 'axios'
import { useCallback } from 'react'
import { useAuthentication } from './useAuthentication'
import {
  GitHubActivitiesResponseData,
  GitHubRepositoriesResponseData,
} from '@/models/response/github_response'
import { GitHubRepository } from '@/models/github/GitHubRepository'

const activitiesState = atom<GitHubActivity[]>({
  key: 'mypage/activities',
  default: [],
})

const repositoriesState = atom<GitHubRepository[]>({
  key: 'mypage/repositories',
  default: [],
})

export function useMypage() {
  const { apiHeaders, user } = useAuthentication({ shouldInitialize: false })
  const [activities, setActivities] = useRecoilState(activitiesState)
  const [repositories, setRepositories] = useRecoilState(repositoriesState)

  const fetchActivities = useCallback(async () => {
    const response = await axios.get<GitHubActivitiesResponseData>(
      '/api/github/activities',
      apiHeaders
    )
    setActivities(response.data.activities)
  }, [user])

  const fetchRepositories = useCallback(async () => {
    const response = await axios.get<GitHubRepositoriesResponseData>(
      '/api/github/repositories',
      apiHeaders
    )
    setRepositories(response.data.repositories)
  }, [user])

  const initialize = useCallback(async () => {
    fetchActivities()
    fetchRepositories()
  }, [user])

  return { activities, initialize, repositories }
}
