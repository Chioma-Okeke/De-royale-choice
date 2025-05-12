import { BaseService } from "./base-service";
import { IGetCustomerResponse } from "@/types";

class LookupService extends BaseService {
    constructor() {
        super("/vlookup");
    }

    public async getCustomerList(term: string) {
        const res = await this.get<IGetCustomerResponse>(
            `/customer?term=${term}`
        );
        return res.customer;
    }
}

export default LookupService;
