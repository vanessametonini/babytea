import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'bt-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
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
    confirmar: new FormControl('', Validators.required),
    whatsapp: new FormControl(''),
    termos: new FormControl(false, [Validators.required]),
  }, {
    validators: this.checkPassword
  })

  showPassword: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('bbt-token')) {
      this.router.navigate([''])
    }
  }

  verSenha() {
    this.showPassword = !this.showPassword;
  }

  checkPassword(form: FormGroup){

    const pass = form.get('senha').value,
          confirmPass = form.get('confirmar').value;

    return pass === confirmPass ? null : { notSame: true }     

  }

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
      this.router.navigate(['']);
    }
  }

  cadastrar() {

    this.checkFormValidation(this.formCadastro);

    if(this.formCadastro.valid){
      console.log(this.formCadastro.value);
      localStorage.setItem('bbt-cadastro', JSON.stringify(this.formCadastro.value))

      //e login
      localStorage.setItem('bbt-token', 'blablabla')
      this.router.navigate(['']);
    }

  }

  fieldValidation(form: FormGroup, field: string){
    return form.get(field).invalid && (form.get(field).dirty || form.get(field).touched)
  }

}
