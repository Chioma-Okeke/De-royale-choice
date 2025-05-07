import { IContact, IContactResponse, IGetContactsResponse } from '@/models/types'
import { BaseService } from './base-service'

class ContactService extends BaseService {
  constructor() {
    super('/customer')
  }

  public async registerCustomer( requestData: IContact) {
    const res = await this.post<IContactResponse, IContact>('', requestData)
    return res
  }
}

export default ContactService
