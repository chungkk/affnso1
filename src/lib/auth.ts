import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'

const BCRYPT_ROUNDS = 12

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function getSession() {
  return getServerSession()
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return !!session?.user
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8
}

export function isValidUsername(username: string): boolean {
  return username.length >= 3 && username.length <= 50
}
