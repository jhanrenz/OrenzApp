import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Category, CategoryData } from "../types/category";
import * as categoryApi from "../api/categoryApi";

export const useFetchCategories = () => {
    return useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: categoryApi.fetchCategories,
        staleTime: 5 * 60 * 1000
    });
};

export const useFetchTrashedCategories = () => {
    return useQuery<Category[]>({
        queryKey: ['categories', 'trashed'],
        queryFn: categoryApi.fetchTrashedCategories,
        staleTime: 5 * 60 * 1000
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data : CategoryData) => categoryApi.createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ['categories']})
        },
    });
};


export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, data} : {id : number; data : CategoryData})=>
            categoryApi.updateCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id : number) => categoryApi.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']})
            queryClient.invalidateQueries({queryKey: ['categories', 'trashed']})
        },
    });
};

export const useRestoreCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id : number) => categoryApi.restoreCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories']});
            queryClient.invalidateQueries({ queryKey: ['categories', 'trashed']});
        },
    });
};


export const useForceDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id : number) => categoryApi.forceDeleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey : ['categories']});
            queryClient.invalidateQueries({ queryKey : ['categories', 'trashed']});
        },
    });
};
