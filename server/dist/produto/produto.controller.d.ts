import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { TokenService } from 'src/token.service';
export declare class ProdutoController {
    private readonly produtoRepository;
    private readonly tokenService;
    constructor(produtoRepository: Repository<Produto>, tokenService: TokenService);
    findAll(token: any): Promise<Produto[]>;
    create(produtoInput: any): Promise<Produto>;
}
