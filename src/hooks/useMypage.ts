import { atom, useRecoilState } from 'recoil'
import { GitHubActivity } from './../models/github/GitHubActivity'
import axios from 'axios'
import { useCallback, useEffect } from 'react'
import { useAuthentication } from './useAuthentication'
import { GitHubActivitiesResponseData } from '@/models/response/github_response'

const activitiesState = atom<GitHubActivity[]>({
  key: 'mypage/activities',
  default: [],
})

export function useMypage() {
  const { apiHeaders, user } = useAuthentication({ shouldInitialize: false })
  const [activities, setActivities] = useRecoilState(activitiesState)

  const initialize = useCallback(async () => {
    const response = await axios.get<GitHubActivitiesResponseData>(
      '/api/github/activities',
      apiHeaders
    )
    setActivities(response.data.activities)
  }, [user])

  return { activities, initialize }
}
