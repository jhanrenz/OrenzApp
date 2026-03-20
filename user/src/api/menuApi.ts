import { api } from "../config/api";
import type { Menu, MenuData } from "../types/menu";

export const fetchMenus = async (params? :{
    search?: string;
    category_id?: number;
    filter?: string;
    page?: number;
}): Promise<{
    data: Menu[];
    current_page: number;
    last_page: number;
    total: number
}> => {
    const response = await api.get('/menus', {
        params,
    });

    return response.data.menus;
};

export const fetchTrashedMenus = async (): Promise<Menu[]> => {
    const response = await api.get("/menus?filter=trashed");
    return response.data.menus.data 
};

export const createMenu = async (data: MenuData): Promise<Menu> => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category_id", String(data.category_id));
    formData.append("description", data.description);
    formData.append("cost", String(data.cost));
    formData.append("price", String(data.price));
    if (data.image) formData.append("image", data.image);

    const response = await api.post<{ menu: Menu }>("/menus", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.menu;
};

export const updateMenu = async (id: number, data: MenuData): Promise<Menu> => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category_id", String(data.category_id));
    formData.append("description", data.description);
    formData.append("cost", String(data.cost));
    formData.append("price", String(data.price));
    if (data.image) formData.append("image", data.image);

    const response = await api.patch<{ menu: Menu }>(`/menus/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.menu;
};

export const deleteMenu = async (id: number): Promise<void> => {
    await api.delete(`/menus/${id}`);
};

export const restoreMenu = async (id: number): Promise<void> => {
    await api.patch(`/menus/${id}/restore`);
};

export const forceDeleteMenu = async (id: number): Promise<void> => {
    await api.delete(`/menus/${id}/force`);
};