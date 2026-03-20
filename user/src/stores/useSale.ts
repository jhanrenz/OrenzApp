import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Sale, SaleData } from "../types/sale";
import * as saleApi from "../api/saleApi";

export const useFetchSales = () => {
  return useQuery<Sale[]>({
    queryKey: ["sales"],
    queryFn: saleApi.fetchSales,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SaleData) => saleApi.createSale(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sales"] }),
  });
};

export const useUpdateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: SaleData }) =>
      saleApi.updateSale(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sales"] }),
  });
};

export const useDeleteSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => saleApi.deleteSale(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sales"] }),
  });
};
