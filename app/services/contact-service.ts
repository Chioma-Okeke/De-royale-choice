import { IContact, IContactResponse } from '@/models/types'
import { BaseService } from './base-service'

class ContactService extends BaseService {
  constructor() {
    super('/contact')
  }

  public async sendContactMessage( requestData: IContact) {
    const res = await this.post<IContactResponse, IContact>('', requestData)
    return res
  }
}

export default ContactService
