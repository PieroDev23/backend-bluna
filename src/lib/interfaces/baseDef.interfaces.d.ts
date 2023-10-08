export interface BaseEntity {
    created_at: Date;
    updated_at: Date;
}


export interface User extends BaseEntity {
    user_id: number | string;
    first_name: string;
    last_name: string;
    password: string;
    role: 'NOT_ASSIGNED' | 'ADMIN' | 'COLLABORATOR';
    email: string;
}

export interface Product extends BaseEntity {
    product_id: number | string;
    product_name: string;
    shelf_id: number;
    stock: number;
    code: string;
    price: number;
}