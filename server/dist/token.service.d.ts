export declare class TokenService {
    options: {
        expiresIn: number;
    };
    generate(userData: any): any;
    verify(token: any): Promise<unknown>;
}
