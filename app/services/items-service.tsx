import { ICreateItemRequest, IGetCategoriesResponse, IGetItemsResponse, IPaginationParams } from "@/types";
import { BaseService } from "./base-service";

class ItemsService extends BaseService {
    constructor() {
        super("/items");
    }

    public async getItemsList(params?: IPaginationParams) {
        const res = await this.get<IGetItemsResponse>(
            ``,
            { ...params } as Record<string, unknown>
        );
        return res;
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
