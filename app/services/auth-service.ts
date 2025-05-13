import { IGetUser, UserAuthBody } from '@/types';
import { BaseService } from './base-service'

export class AuthService extends BaseService {
  constructor(headers?: Record<string, string>) {
    super('/auth')
  }

  public async login (userData: UserAuthBody)  {
    const res = await this.post<IGetUser, UserAuthBody>("/login", userData);
    return res
  };
  
  public async logout ()  {
    await this.post("/logout");
  };
  
  public async checkAuth ()  {
    const res = await this.get<IGetUser>("/me");
    return res.user;
  };
  
}
