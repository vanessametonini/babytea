import { Repository } from 'typeorm';
import { User } from './user.entity';
import { TokenService } from 'src/token.service';
import { LoginDto } from './dto/login';
export declare class UserService {
    private readonly userRepository;
    private readonly tokenService;
    constructor(userRepository: Repository<User>, tokenService: TokenService);
    findAll(): Promise<User[]>;
    findByEmail(userEmail: string): Promise<User>;
    findById(id: string): Promise<User>;
    create(user: any): Promise<User>;
    update(id: any, newValue: any): Promise<User>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    login(userLoginInfo: LoginDto): Promise<any>;
}
