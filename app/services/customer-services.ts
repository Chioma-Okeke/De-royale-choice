import { IContact, IContactResponse, IGetContactsResponse } from '@/models/types'
import { BaseService } from './base-service'
import { ICreateCustomer, IGetCustomerContent, IGetCustomerResponse } from '@/types'

class CustomerService extends BaseService {
  constructor() {
    super('/customers')
  }

  public async registerCustomer( requestData: ICreateCustomer) {
    const res = await this.post<IGetCustomerContent, ICreateCustomer>('', requestData)
    return res
  }
}

export default CustomerService
