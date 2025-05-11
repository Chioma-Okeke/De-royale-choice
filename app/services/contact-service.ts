import { IContact, IContactResponse, IGetContactsContent, IGetContactsResponse } from '@/models/types'
import { BaseService } from './base-service'

class ContactService extends BaseService {
  constructor() {
    super('/contact')
  }

  public async sendContactMessage( requestData: IContact) {
    const res = await this.post<IContactResponse, IContact>('', requestData)
    return res
  }

  public async getContacts() {
    const res = await this.get<IGetContactsResponse>('')
    return res.data
  }

  public async getUnreadInquiries() {
    const res = await this.get<IGetContactsContent[]>("/unread")
    return res
  }

  public async markUnReadMessages() {
    const res = await this.post("/markread", undefined)

  }

  public async markMessageAsRead(id: string) {
    const res = await this.post(`/markread/${id}`)
  }
}

export default ContactService
