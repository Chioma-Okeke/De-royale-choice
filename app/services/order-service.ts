import { IContact, IContactResponse, IGetContactsResponse } from '@/models/types'
import { BaseService } from './base-service'
import { ICreateCustomer, IGetCustomerResponse } from '@/types'

class OrderService extends BaseService {
  constructor() {
    super('/registrations')
  }

  public async placeOrder( orderData: ICreateCustomer) {
    const res = await this.post<IGetCustomerResponse, ICreateCustomer>('', orderData)
    return res
  }
}

export default OrderService
