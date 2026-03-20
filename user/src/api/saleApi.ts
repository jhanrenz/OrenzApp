import { api } from "../config/api";
import type { Sale, SaleData } from "../types/sale";

export const fetchSales = async (): Promise<Sale[]> => {
  const response = await api.get<{ sales: Sale[] }>("/sales");
  return response.data.sales ?? [];
};

export const createSale = async (data: SaleData): Promise<Sale> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.append(key, String(value)));

  const response = await api.post<{ sale: Sale }>("/sales", formData, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data.sale;
};

export const updateSale = async (id: number, data: SaleData): Promise<Sale> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.append(key, String(value)));

  const response = await api.patch<{ sale: Sale }>(`/sales/${id}`, formData, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data.sale;
};

export const deleteSale = async (id: number): Promise<void> => {
  await api.delete(`/sales/${id}`);
};
