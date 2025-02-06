import { auth, signInWithEmailAndPassword } from './firebaseConfig'

const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user
    const token = await user.getIdToken()
    console.log('Firebase Token:', token) // Log the token
    return token
  } catch (error) {
    console.error('Error signing in:', error)
    throw error
  }
}

export { signInUser }
