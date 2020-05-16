import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'bt-welcome',
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent implements OnInit {

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmar: new FormControl('', [Validators.required, Validators.minLength(6)]),
    whatsapp: new FormControl(''),
    termos: new FormControl(false, [Validators.required]),
  })

  constructor() { }

  ngOnInit() {
  }

  // passwordValidation(control: AbstractControl){
  //   console.log(control.value === control.parent.get('senha').value);
  //   return control.value === control.parent.get('senha').value
  // }

  checkFormValidation(form){
    if (form.invalid) {
      form.markAllAsTouched()
    }
  }
  
  entrar(){
    this.checkFormValidation(this.formLogin);

    if (this.formLogin.valid) {
      console.log(this.formLogin.value);

      localStorage.setItem('bbt-token', 'blablabla')
    }
  }

  cadastrar() {

    this.checkFormValidation(this.formCadastro);

    if(this.formCadastro.valid){
      console.log(this.formCadastro.value);
      
      localStorage.setItem('bbt-cadastro', JSON.stringify(this.formCadastro.value))
    }

  }

  fieldValidation(form: FormGroup, field: string){
    return form.get(field).invalid && (form.get(field).dirty || form.get(field).touched)
  }

}
