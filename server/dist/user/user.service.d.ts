import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findByEmail(userEmail: string): Promise<User>;
    findById(id: string): Promise<User>;
    create(user: any): Promise<User>;
    update(id: any, newValue: any): Promise<User>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    login(userLoginInfo: any): Promise<void>;
}
