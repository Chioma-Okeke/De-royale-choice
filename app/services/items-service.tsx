import { ICreateItemRequest, IGetCategoriesResponse, IGetItemsResponse } from "@/types";
import { BaseService } from "./base-service";

class ItemsService extends BaseService {
    constructor() {
        super("/items");
    }

    public async getItemsList() {
        const res = await this.get<IGetItemsResponse>(
            ``
        );
        return res.items;
    }

    public async createItem(data: ICreateItemRequest) {
        const res = await this.post<IGetItemsResponse, ICreateItemRequest>("", data)
        return res
    }

    public async updateItem(data: ICreateItemRequest, id: string) {
        const res = await this.put<IGetItemsResponse, ICreateItemRequest>(`/${id}`, data)
        return res
    }

    public async deleteItem(id: string) {
        const res = await this.delete<IGetItemsResponse>(`/${id}`)
        return res
    }
}

export default ItemsService;
