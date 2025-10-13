import { Filter } from '../dto/Filter';

export const buildRecipeParams = (filter: Filter) => {
    const params: {
        page: number,
        size: number,
        category?: string
        search?: string,
    } = {
        page: filter.page ?? 0,
        size: filter.size ?? 10,
    };

    if (filter.category && filter.category.trim() !== '') {
        params.category = filter.category;
    }

    if (filter.search && filter.search.trim() !== '') {
        params.search = filter.search;
    }

    return params;
}
