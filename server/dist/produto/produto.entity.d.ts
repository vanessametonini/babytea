export declare enum productStatus {
    reservado = "reservado",
    livre = "livre",
    ilimitado = "ilimitado"
}
export declare enum categoria {
    bebe = "beb\u00EA",
    papai = "papai",
    mamae = "mam\u00E3e",
    familia = "fam\u00EDlia"
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
    categoria: categoria;
    descricao: string;
    cadastradoEm: Date;
}
export {};
