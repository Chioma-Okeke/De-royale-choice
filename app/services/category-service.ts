import { IGetCategoriesResponse } from "@/types";
import { BaseService } from "./base-service";

class CategoryService extends BaseService {
    constructor() {
        super("/category");
    }

    public async getCategoryList() {
        const res = await this.get<IGetCategoriesResponse[]>(
            ``
        );
        return res;
    }

    public async createCategory(data: {name: string}) {
        const res = await this.post<IGetCategoriesResponse, {name: string}>("", data)
        return res
    }

    public async deleteCategory(id: string) {
        const res = await this.delete<IGetCategoriesResponse>(`/${id}`)
        return res
    }
}

export default CategoryService;
