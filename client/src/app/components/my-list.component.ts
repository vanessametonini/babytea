import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { AddToMyListService } from '../services/add-to-my-list.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'bt-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  products: Product[] = [];
  isProductsVisible = 'none';

  constructor(private myListService: AddToMyListService
            ,private userService: UserService) {}

  ngOnInit(): void {

    this.userService.getUserList().subscribe(listaDeProdutosUserApi => {
      this.products = listaDeProdutosUserApi
    })
    
    // this.myListService
    //     .emissorDeProdutos
    //     .subscribe(listaDeProdutos => {
    //       this.products = listaDeProdutos
    //     })
  }

  verLista(){
    if(this.isProductsVisible === 'none') {
      this.isProductsVisible = 'block';
    } 
    else {
      this.isProductsVisible = 'none'
    }
  }

  removerLista(produto) {
    this.myListService.removerProduto(produto);
  }

}
