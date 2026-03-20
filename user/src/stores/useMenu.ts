import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Menu, MenuData } from "../types/menu";
import * as menuApi from "../api/menuApi";

export const useFetchMenus = (params?: {
  search?: string;
  category_id?: number;
  filter?: string;
  page?: number;
}) =>
  useQuery({
    queryKey: ["menus", params?.search, params?.category_id, params?.filter, params?.page],
    queryFn: () => menuApi.fetchMenus(params),
    staleTime: 5 * 60 * 1000,
  });

export const useFetchTrashedMenus = () =>
    useQuery<Menu[]>({
        queryKey: ["menus", "trashed"],
        queryFn: menuApi.fetchTrashedMenus,
        staleTime: 5 * 60 * 1000,
    });

export const useCreateMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: MenuData) => menuApi.createMenu(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menus"] }),
    });
};

export const useUpdateMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: MenuData }) =>
            menuApi.updateMenu(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menus"] }),
    });
};

export const useDeleteMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => menuApi.deleteMenu(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menus"] }),
    });
};

export const useRestoreMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => menuApi.restoreMenu(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menus"] });
            queryClient.invalidateQueries({ queryKey: ["menus", "trashed"] });
        },
    });
};

export const useForceDeleteMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => menuApi.forceDeleteMenu(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menus"] });
            queryClient.invalidateQueries({ queryKey: ["menus", "trashed"] });
        },
    });
};