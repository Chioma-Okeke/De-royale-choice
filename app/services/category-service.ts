import { IGetCategoriesResponse, IGetSingleCategory } from "@/types";
import { BaseService } from "./base-service";

class CategoryService extends BaseService {
    constructor() {
        super("/categories");
    }

    public async getCategoryList() {
        const res = await this.get<IGetCategoriesResponse>(
            ``
        );
        return res.categories;
    }

    public async createCategory(data: {name: string}) {
        const res = await this.post<IGetCategoriesResponse, {name: string}>("", data)
        return res
    }

    public async deleteCategory(id: string) {
        const res = await this.delete<IGetCategoriesResponse>(`/${id}`)
        return res
    }

    public async getSingleCategoryItem(id: string) {
        const res = await this.get<IGetSingleCategory>(`/${id}`)
        return res.category.items
    }
}

export default CategoryService;
