import axios, { AxiosInstance, RawAxiosRequestHeaders } from 'axios'

export const createAxiosInstance = (
  clientUrl: string,
  // version: 'v1' | 'v2' = 'v1',
  headers?: RawAxiosRequestHeaders
): AxiosInstance => {
  return axios.create({
    timeout: 120000,
    baseURL: `/api${clientUrl}/`,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
}
