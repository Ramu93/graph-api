export interface User {
    id: string;
    username: string;
    full_name: string;
    biography?: string;
    is_business_account?: boolean;
}