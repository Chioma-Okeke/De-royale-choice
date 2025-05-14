import { BaseService } from './base-service'
import { ICreateOrder, IGetOrders, IGetOrdersParams } from '@/types'

class OrderService extends BaseService {
  constructor() {
    super('/registrations')
  }

  public async placeOrder( orderData: ICreateOrder) {
    const res = await this.post<IGetOrders, ICreateOrder>('', orderData)
    return res
  }

  public async getOrders (params?: IGetOrdersParams) {
    const res = await this.get<IGetOrders>("", { ...params } as Record<string, unknown>)
    return res
  }

  public async getSingleOrder(id:string) {
    const res = await this.get(`/${id}`)
    console.log(res)
  }
}

export default OrderService
