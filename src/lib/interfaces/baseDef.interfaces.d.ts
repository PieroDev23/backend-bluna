export interface BaseEntity {
    created_at?: Date;
    updated_at?: Date;
}

export interface User extends BaseEntity {
    user_id?: number | string;
    first_name: string;
    last_name: string;
    password: string;
    role: 'NOT_ASSIGNED' | 'ADMIN' | 'COLLABORATOR';
    email: string;
}

export interface IRequest extends BaseEntity {
    request_id?: number | string;
    quantity: number;
    user_id: number | string;
    product_id: number | string;
    status: 'PENDIENTE' | 'ACEPTADO' | 'RECHAZADO';
}

export interface Product extends BaseEntity {
    product_id?: number | string;
    product_name: string;
    shelf_id: number;
    stock: number;
    code: string;
    price: number;
}

export interface IHistory extends BaseEntity {
    history_id?: number | string;
    user_id: number | string;
    product_id: number | string;
    metada: string;
}

export interface SelectJoinOptions {
    fields: string[],
    joinType: 'INNER' | 'LEFT' | 'RIGHT',
    on: string;
}