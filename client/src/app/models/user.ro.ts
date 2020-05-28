import { Product } from './product';

export class UserResponseObject {
  readonly id: string;
  readonly nomeCompleto: string;
  readonly email: string;
  readonly produtos: Product[];
  readonly token: string;

}