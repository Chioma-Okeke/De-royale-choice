import axios, { AxiosInstance, RawAxiosRequestHeaders } from 'axios'

export const createAxiosInstance = (
  clientUrl: string,
  // version: 'v1' | 'v2' = 'v1',
  headers?: RawAxiosRequestHeaders
): AxiosInstance => { const isServer = typeof window === 'undefined'

  const baseURL = isServer
    ? `${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000'}/api${clientUrl}`
    : `/api${clientUrl}`
  return axios.create({
    timeout: 60000,
    baseURL: baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
}
