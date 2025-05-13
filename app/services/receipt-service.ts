import { BaseService } from "./base-service";

class ReceiptService extends BaseService {
    constructor() {
        super("/receipts");
    }

    public async fetchReceiptHTML (orderId: string) {
        const res = await this.get(`/${orderId}`);
        return res;
      };

    public async fetchReceiptPDF (orderId: string) {
        const res = await this.get(`/${orderId}?format=pdf`, {
          responseType: 'blob',
        });
        return res;
      };
}

export default ReceiptService;
