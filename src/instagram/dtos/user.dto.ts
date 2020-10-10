import { User } from "../interfaces/user.interface";

export class UserDto {
    readonly username: string;
    readonly full_name: string;
    readonly id: string;
    readonly biography: string;
    readonly is_business_account: boolean;
    readonly followers: number;

    constructor(user: User){
        const { username, full_name, id, biography, is_business_account, edge_followed_by } = user;
        this.username = username;
        this.full_name = full_name;
        this.id = id;
        this.biography = biography;
        this.is_business_account = is_business_account;
        this.followers = edge_followed_by;
    }
}