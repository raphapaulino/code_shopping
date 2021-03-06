export interface Category {
    id?: number;
    name: string;
    readonly slug?: string;
    active: boolean;
    readonly created_at?: { date: string };
    readonly updated_at?: { date: string };
}

export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    readonly slug?: string;
    active: boolean;
    readonly created_at?: { date: string };
    readonly updated_at?: { date: string };
}

export interface ProductCategory {
    product: Product;
    categories: Category[] // ou Array<Category> antiga notação
}

export interface User {
    id?: number;
    name: string;
    email: string;
    password?: string;
    // password_confirmation?: string; // facultativo
    readonly created_at?: { date: string };
    readonly updated_at?: { date: string };
}