export class Product {
         fotoUrl = '';
         titulo = '';
         quantidade = 1;
         valorMin = 0;
         valorMax = 0;
         lojas: Loja[] = [];
         status: productStatus;
       }

class Loja {
  nome = "";
  url = ""
}

export enum productStatus {
  reservado = 'reservado',
  livre = 'livre',
  ilimitado = 'ilimitado'
}
