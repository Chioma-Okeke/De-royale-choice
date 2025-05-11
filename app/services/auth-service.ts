import { deleteAccessRefreshTokens } from '~/actions/util-actions'
import Logger from '~/utils/logger'
import { BaseService } from './base-service'

export class AuthService extends BaseService {
  constructor(headers?: Record<string, string>) {
    super('/auth', 'v1', headers)
  }

  public async logoutUser(): Promise<string> {
    try {
      await this.post<string, ''>('/logout')
      await deleteAccessRefreshTokens()
      return 'Logged user out successfully'
    } catch (error) {
      Logger.error('Logout failed:', error)
      throw new Error('Failed to log out. Please try again.')
    }
  }
}
