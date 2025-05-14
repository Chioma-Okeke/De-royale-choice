import { BaseService } from './base-service'
import { ICreateOrder, ICreateOrderResponse, IGetOrders, IGetOrdersParams, ISingleOrderResponse } from '@/types'

class OrderService extends BaseService {
  constructor() {
    super('/registrations')
  }

  public async placeOrder( orderData: ICreateOrder) {
    const res = await this.post<ICreateOrderResponse, ICreateOrder>('', orderData)
    return res
  }

  public async getOrders (params?: IGetOrdersParams) {
    const res = await this.get<IGetOrders>("", { ...params } as Record<string, unknown>)
    return res
  }

  public async getSingleOrder(id:string) {
    const res = await this.get<ISingleOrderResponse>(`/${id}`)
    return res
  }
}

export default OrderService
