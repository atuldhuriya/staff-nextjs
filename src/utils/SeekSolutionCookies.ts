'use server'

import { cookies } from 'next/headers'
import { ACCESS_TOKEN } from './constant'

export async function setToken(value: string) {
    return await cookies().set(ACCESS_TOKEN, value)
}
export async function getToken() {
    return await cookies().get(ACCESS_TOKEN)?.value
}
export async function deleteToken() {
    return await cookies().delete(ACCESS_TOKEN)
}
