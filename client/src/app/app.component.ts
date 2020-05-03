import { Component } from '@angular/core';
import { Product, productStatus } from './models/product';

@Component({
  selector: 'bt-root',
  templateUrl: `./app.component.html`,
  styles: [],
})
export class AppComponent {
  listaProdutos: Product[] = [
    {
      fotoUrl: 'https://www.casasbahia-imagens.com.br/bebes/bercosecercadosportateis/14772925/1293194392/berco-side-by-side-safety-1st-grafite-14772925.jpg',
      titulo: 'Berço portátil',
      quantidade: 1,
      valorMin: 339,
      valorMax: 889,
      lojas: [
        {
          nome: 'Dafiti',
          url:
            'https://www.dafiti.com.br/MINI-BERCO-MOISES-3-em-1--CO-BED-5044423.html',
        },
        {
          nome: 'AlôBebê',
          url: 'https://www.alobebe.com.br/berco-new-mini-play-c55b.html,15427',
        },
        {
          nome: 'Americanas',
          url:
            'https://www.americanas.com.br/produto/134220501/berco-portatil-bege-poa-voyage?cor=BEGE&tamanho=UNICO&voltagem=BIVOLT',
        },
        {
          nome: 'Casas Bahia',
          url:'https://www.casasbahia.com.br/bebes/bercosecercadosportateis/berco-desmontavel-safety-1st-mini-play-pop-bege-11653998.html?rectype=p1_ov_f_s12&recsource=cat-861',
        },
      ],
      status: productStatus.livre,
    },
  ];
}



// {
//   fotoUrl: '',
//   titulo: '',
//   quantidade: 1,
//   valorMin: 1,
//   valorMax: 1,
//   lojas: [
//     {
//       nome: '',
//       url: ''
//     }
//   ],
//   status: ''
// }


/*

<li>
        <figure>
          <img
            src="https://images.madeiramadeira.com.br/product/images/58727573-comoda-infantil-1-porta-4-gavetas-retro-completa-moveis-7899671403516-1_zoom-1500x1500.jpg"
            alt="">
            <figcaption>imagem sugestiva</figcaption>
        </figure>
        <h3><strong>1</strong>Cômoda Infantil 1 Porta 4 Gavetas</h3>
        <dl>
          <dt>Valores:</dt>
          <dd>de R$ 294,00 a 450,00</dd>
          <dt>Lojas:</dt>
          <dd>
            <ul>
              <li>
                <a href="https://www.madeiramadeira.com.br/comoda-infantil-1-porta-4-gavetas-retro-completa-moveis-280221.html">MadeiraMadeira</a>
              </li>
              <li>
                <a href="https://www.madeiramadeira.com.br/comoda-de-bebe-1-porta-4-gavetas-manu-moveis-peroba-2453522.html">MadeiraMadeira</a>
              </li>
            </ul>
          </dd>
        </dl>
        <section class="reserva">
          <strong>Livre</strong>
        </section>
      </li>
*/
