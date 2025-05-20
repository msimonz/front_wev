export interface User {
    id: number;
    username: string;
    email: string;
    roles: Role[];
    token?: string;
}

export interface Role {
    id: number;
    name: string;
} 