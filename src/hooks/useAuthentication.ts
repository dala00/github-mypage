import { Collections } from '@/database/collections'
import { GetUserResponseData } from '@/models/response/user_response'
import { User } from '@/models/User'
import { doc, getFirestore, setDoc } from '@firebase/firestore'
import axios, { AxiosRequestConfig } from 'axios'
import {
  getAuth,
  GithubAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  getIdToken,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { useCallback, useEffect, useMemo } from 'react'
import { atom, useRecoilState } from 'recoil'

const userState = atom<User>({
  key: 'authentication/user',
  default: null,
})

const idTokenState = atom<string>({
  key: 'authentication/idToken',
  default: null,
})

const isInitializedState = atom<boolean>({
  key: 'authentication/isInitialized',
  default: false,
})

type Args = {
  shouldInitialize: boolean
}

export function useAuthentication(args: Args) {
  const [user, setUser] = useRecoilState(userState)
  const [idToken, setIdToken] = useRecoilState(idTokenState)
  const [isInitialized, setIsInitialized] = useRecoilState(isInitializedState)

  const generateApiHeaders = useCallback(
    (token: string): AxiosRequestConfig => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    []
  )

  const apiHeaders = useMemo(
    () => (idToken ? generateApiHeaders(idToken) : undefined),
    [idToken]
  )

  const initialize = useCallback(async () => {
    if (user || !args.shouldInitialize) {
      return
    }

    const auth = getAuth()
    const db = getFirestore()

    getRedirectResult(auth)
      .then(async (result) => {
        const credential = GithubAuthProvider.credentialFromResult(result)
        const user: Omit<User, 'id'> = {
          githubToken: credential.accessToken,
          screenName: (result.user as any).reloadUserInfo.screenName,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          ignoreCommitRepositoryIds: [],
        }
        const addUserResult = await setDoc(
          doc(db, Collections.users, result.user.uid),
          user
        ).catch((error) => {
          console.error(error)
          return false
        })
        // if (addUserResult === false) {
        //   alert('エラーが発生しました。')
        //   return
        // }
        setUser({ ...user, id: result.user.uid })
      })
      .catch((error) => {
        console.error(error)
      })

    onAuthStateChanged(auth, async (firebaseUser) => {
      if (user) {
        return
      }

      if (firebaseUser) {
        const idToken = await getIdToken(firebaseUser).catch(function (error) {
          console.error(error)
          return null
        })
        if (!idToken) {
          return
        }

        const response = await axios
          .get<GetUserResponseData>(
            '/api/users/get-user',
            generateApiHeaders(idToken)
          )
          .catch((error) => {
            console.error(error)
            return null
          })
        if (!response) {
          return
        }

        setUser(response.data.user)
        setIdToken(idToken)
      } else {
        setUser(null)
        setIdToken(null)
      }
      setIsInitialized(true)
    })
  }, [user])

  useEffect(() => {
    initialize()
  }, [])

  const signInWithGithub = useCallback(() => {
    const auth = getAuth()
    const provider = new GithubAuthProvider()
    provider.addScope('read:user')
    provider.addScope('repo')
    signInWithRedirect(auth, provider)
  }, [])

  const signOutFromApp = useCallback(async () => {
    const auth = getAuth()
    await signOut(auth)
    setUser(null)
    setIdToken(null)
  }, [])

  return {
    apiHeaders,
    isInitialized,
    setUser,
    signInWithGithub,
    signOut: signOutFromApp,
    user,
  }
}
