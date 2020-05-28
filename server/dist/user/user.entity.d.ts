import { Produto } from "src/produto/produto.entity";
export declare class User {
    id: string;
    nomeCompleto: string;
    whatsapp: string;
    email: string;
    password: string;
    termos: boolean;
    cadastradoEm: Date;
    produtos: Produto[];
    hashPassword(): Promise<void>;
    comparePassword(attempt: string): Promise<any>;
}
