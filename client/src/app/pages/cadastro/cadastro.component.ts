import { Component, OnInit } from '@angular/core';
import { categoria } from 'src/app/models/categoria.enum';
import { productStatus } from 'src/app/models/product-status.enum';
import { Validators, FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'bt-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  categorias;
  statusList;

  formCadastro = this.fb.group({
    titulo: ['', [Validators.required]],
    fotoUrl: ['', [Validators.required]],
    quantidade: ['', [Validators.required]],
    valorMin: ['', [Validators.required]],
    valorMax: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    status: ['', [Validators.required]],
    descricao: [''],
    lojas: new FormArray([])
  })

  constructor(private servico: ProdutoService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.categorias = Object.values(categoria)
    this.statusList = Object.values(productStatus)
  }

  get lojas(): FormArray {
    return this.formCadastro.get('lojas') as FormArray;
  }

  addLoja(clickEvent: Event) {

    clickEvent.preventDefault();

    const lojaGroup = new FormGroup({
      nome: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required)
    });

    this.lojas.push(lojaGroup)

  }

  removeLoja(clickEvent: Event, groupIndex) {
    clickEvent.preventDefault();
    this.lojas.removeAt(groupIndex);
  }

  enviarCadastro() {

    if (this.formCadastro.invalid) {
      this.formCadastro.markAllAsTouched();
      return
    }

    console.log(this.formCadastro.value);

    this.servico
      .gravar(this.formCadastro.value)
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['']);
          
        }
        , (erro: HttpErrorResponse) => {
          console.log(erro.error.body[0].message);
        }
      )
  }

}
