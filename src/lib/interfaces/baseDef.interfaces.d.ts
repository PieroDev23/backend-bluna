export interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    password: string;
    role: 'NOT_ASSIGNED' | 'ADMIN' | 'COLLABORATOR';
    email: string;
    created_at: Date;
    updated_at: Date;
}

export interface Product {
    product_id: number;
    product_name: string;
    shelf_id: number;
    stock: number;
    price: number;
    created_at: Date;
    updated_at: Date;
}