import { BaseService } from "./base-service";

class ReceiptService extends BaseService {
  constructor() {
    super("/receipts");
  }

  public async fetchReceiptHTML(orderId: string, copy: string) {
    console.log(copy, "in service")
    const res = await this.get<string>(`/${orderId}`, { copy : copy });
    return res;
  };

  public async fetchReceiptPDF(orderId: string) {
    const res = await this.get(`/${orderId}?format=pdf`, {
      responseType: 'blob',
    });
    return res;
  };
}

export default ReceiptService;
