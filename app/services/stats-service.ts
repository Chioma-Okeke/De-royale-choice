import { BaseService } from './base-service'
import { IGetBusinessStats, IGetDailyStats } from '@/types'

class StatsService extends BaseService {
  constructor() {
    super('/stats')
  }

  public async getBusinessStats() {
    const res = await this.get<IGetBusinessStats>('/business-stats')
    return res.stats
  }

  public async getDailyStats() {
    const res = await this.get<IGetDailyStats>('/daily-stats')
    return res
  }

}

export default StatsService
