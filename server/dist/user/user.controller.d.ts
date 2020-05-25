import { User } from './user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    list(): Promise<User[]>;
    create(userInput: User): Promise<User>;
    login(userInput: {
        email: any;
        password: any;
    }): Promise<any>;
    update(params: any, partialUser: any): Promise<User>;
    delete(params: any): Promise<import("typeorm").DeleteResult>;
}
