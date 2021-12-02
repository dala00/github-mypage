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

export function useAuthentication() {
  const [user, setUser] = useRecoilState(userState)
  const [idToken, setIdToken] = useRecoilState(idTokenState)

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
      }
    })
  }, [])

  useEffect(() => {
    initialize()
  }, [])

  const signInWithGithub = useCallback(() => {
    const auth = getAuth()
    const provider = new GithubAuthProvider()
    provider.addScope('read:user')
    signInWithRedirect(auth, provider)
  }, [])

  return { apiHeaders, setUser, signInWithGithub, user }
}
