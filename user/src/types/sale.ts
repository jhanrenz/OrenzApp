export interface Menu{
    id: number;
    name: string;
    cost: number;
    price: number;
}

export interface Sale{
    id: number;
    menu_id: number;
    sale_date: string;
    quantity: number;
    current_cost: number;
    current_price: number;
    total_cost: number;
    total_price: number;
    total_profit: number;
    menu?: Menu
}

export interface SaleData{
    menu_id: number;
    sale_date: string;
    quantity: number;
    current_cost: number;
    current_price: number;
    total_cost: number;
    total_price: number;
    total_profit: number;
    menu?: Menu
}