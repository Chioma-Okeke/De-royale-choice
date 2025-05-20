import { IcreateUser, IGetUser, IGetUsers, IPasswordResetData, IPasswordResetResponse, UserAuthBody } from '@/types';
import { BaseService } from './base-service'

export class UserService extends BaseService {
  constructor() {
    super('/users')
  }
  
  public async getUsers ()  {
    const res = await this.get<IGetUsers>("");
    return res.users;
  };

  public async deleteUser (id: string) {
    const res = await this.delete(`/${id}`)
    return res
  }
  
}
