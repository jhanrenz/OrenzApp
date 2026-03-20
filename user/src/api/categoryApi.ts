import { api } from "../config/api";
import type { Category,CategoryData } from "../types/category";


export const fetchCategories = async () : Promise<Category[]> => {
    const response = await api.get<{categories : Category[]}>('/categories')
    return response.data.categories ?? []
}

export const fetchTrashedCategories = async () : Promise<Category[]> => {
    const response = await api.get<{categories: Category[]}>('/categories?filter=trashed');
    return response.data.categories ?? []
}

export const createCategory = async (data : CategoryData) : Promise<Category>=>{
    const response = await api.post('/categories', data)
    return response.data.category
}

export const updateCategory = async ( id : number, data : CategoryData) : Promise<Category>=>{
    const response = await api.patch(`/categories/${id}`, data)
    return response.data.category
}

export const deleteCategory = async ( id : number ) : Promise<void> => {
    await api.delete(`/categories/${id}`)
}

export const restoreCategory = async (id : number) : Promise<void> => {
    await api.patch(`/categories/${id}/restore`)
}

export const forceDeleteCategory = async (id : number) : Promise<void> => {
    await api.delete(`/categories/${id}/force`)
}