import { IsOptional } from "class-validator";
import { User } from "../interfaces/user.interface";

export class UserDto {
    readonly username: string;
    readonly full_name: string;
    readonly id: string;
    readonly biography: string;
    readonly is_business_account: boolean;

    constructor(user: User){
        const { username, full_name, id, biography, is_business_account } = user;
        this.username = username;
        this.full_name = full_name;
        this.id = id;
        this.biography = biography;
        this.is_business_account = is_business_account;
    }
}