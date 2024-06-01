'use server'
import { cookies } from 'next/headers'


export async function clearToken() {
    cookies().delete('access_token')
  }