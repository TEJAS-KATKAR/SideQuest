/* eslint-disable react-refresh/only-export-components */
import {createContext, useCallback, useContext, useMemo, useState} from 'react'

const AuthContext = createContext(null)
const USER_STORAGE_KEY = 'sidequest-auth-user'
const ACCOUNTS_STORAGE_KEY = 'sidequest-local-accounts'

const readStoredUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || 'null')
    return user && typeof user.username === 'string' && typeof user.avatar === 'string' ? user : null
  } catch {
    return null
  }
}

const storeUser = user => {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  } catch {
    // Keep the current session usable if browser storage is unavailable.
  }
}

const readLocalAccounts = () => {
  try {
    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_STORAGE_KEY) || '{}')
    return accounts && typeof accounts === 'object' ? accounts : {}
  } catch {
    return {}
  }
}

const hashPassword = async (password, salt) => {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )
  const bits = await crypto.subtle.deriveBits(
    {name: 'PBKDF2', hash: 'SHA-256', salt: new TextEncoder().encode(salt), iterations: 120000},
    key,
    256
  )
  return Array.from(new Uint8Array(bits), byte => byte.toString(16).padStart(2, '0')).join('')
}

const createLocalAccount = async ({username, password, avatar}) => {
  const normalizedUsername = username.trim().toLowerCase()
  const accounts = readLocalAccounts()
  if (accounts[normalizedUsername]) throw new Error('That username is already taken.')

  const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, '0')).join('')
  const passwordHash = await hashPassword(password, salt)
  const user = {id: `local-${normalizedUsername}`, username: normalizedUsername, avatar, createdAt: new Date().toISOString()}
  accounts[normalizedUsername] = {user, salt, passwordHash}

  try {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts))
    storeUser(user)
    return user
  } catch {
    throw new Error('Browser storage is unavailable, so your account could not be saved.')
  }
}

const signInLocalAccount = async ({username, password}) => {
  const normalizedUsername = username.trim().toLowerCase()
  const account = readLocalAccounts()[normalizedUsername]
  if (!account) return null

  const passwordHash = await hashPassword(password, account.salt)
  if (passwordHash !== account.passwordHash) throw new Error('Incorrect username or password.')
  return account.user
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(readStoredUser)
  const [loading] = useState(false)

  const signUp = useCallback(async credentials => {
    const localUser = await createLocalAccount(credentials)
    setUser(localUser)
    return localUser
  }, [])

  const signIn = useCallback(async credentials => {
    const localUser = await signInLocalAccount(credentials)
    if (!localUser) throw new Error('No saved account was found. Please create an account first.')
    setUser(localUser)
    storeUser(localUser)
    return localUser
  }, [])

  const signOut = useCallback(() => {
    try {
      localStorage.removeItem(USER_STORAGE_KEY)
    } catch {
      // The in-memory session still ends if browser storage is unavailable.
    }
    setUser(null)
  }, [])

  const value = useMemo(() => ({user, loading, signIn, signUp, signOut}), [user, loading, signIn, signUp, signOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
