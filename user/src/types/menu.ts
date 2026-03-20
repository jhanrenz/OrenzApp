export interface Category{
    id : number;
    name: string
}
export interface Menu {
    id : number;
    name: string;
    category_id: number;
    description: string;
    cost: number;
    price: number;
    profit: number;
    image: string | null;
    category?: Category
}

export interface MenuData {
    name: string;
    category_id: number;
    description: string;
    image?: File | null;
    cost: number;
    price: number;
}



