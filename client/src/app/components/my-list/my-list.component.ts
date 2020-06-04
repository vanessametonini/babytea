import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { AddToMyListService } from '../../services/add-to-my-list.service';
import { UserResponseObject } from '../../models/user.ro';

@Component({
  selector: 'bt-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  products: Product[] = [];
  isProductsVisible = 'none';
  userName = "";

  constructor(private myListService: AddToMyListService) {}

  ngOnInit(): void {
    const user: UserResponseObject = JSON.parse(localStorage.getItem("bbt-user"))
    this.userName = user.nome;
    this.products = user.produtos;

    this.myListService.emissorDeProdutos.subscribe( listaProdutos => this.products = listaProdutos)

  }

  toggleLista() {
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
