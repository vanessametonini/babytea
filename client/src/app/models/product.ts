import { Loja } from './loja';
import { productStatus } from './product-status.enum';
import { categoria } from './categoria.enum';

export class Product {
  id: string;
  cadastradoEm: Date;
  fotoUrl = "";
  titulo = "";
  descricao = "";
  quantidade = 1;
  valorMin = 0;
  valorMax = 0;
  lojas: Loja[] = [];
  status: productStatus;
  categoria: categoria;
}
