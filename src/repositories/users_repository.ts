import { Collections } from '@/database/collections'
import { User } from '@/models/User'
import { firestore } from 'firebase-admin'

export function usersCollection() {
  return firestore().collection(Collections.users)
}

export async function getUser(uid: string): Promise<User> {
  const doc = await usersCollection().doc(uid).get()
  return {
    ...(doc.data() as User),
    id: doc.id,
  }
}

export async function updateUser(uid: string, data: Partial<User>) {
  await usersCollection().doc(uid).update(data)
}
