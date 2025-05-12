import { BaseService } from './base-service'

type UserBody = {
  email: string,
  password: string
}

export class AuthService extends BaseService {
  constructor(headers?: Record<string, string>) {
    super('/auth')
  }

  public async login (userData: UserBody)  {
    const res = await this.post("/login", userData);
    return res
  };
  
  public async logout ()  {
    await this.post("/logout");
  };
  
  public async checkAuth ()  {
    const res = await fetch("/me");
  
    if (!res.ok) return null;
  
    const data = await res.json();
    return data.user;
  };
  
}
