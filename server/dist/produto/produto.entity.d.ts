export declare enum productStatus {
    reservado = "reservado",
    livre = "livre",
    ilimitado = "ilimitado"
}
declare class Loja {
    nome: string;
    url: string;
}
export declare class Produto {
    id: string;
    fotoUrl: string;
    titulo: string;
    quantidade: number;
    valorMin: number;
    valorMax: number;
    lojas: Loja[];
    status: productStatus;
    cadastradoEm: Date;
}
export {};
