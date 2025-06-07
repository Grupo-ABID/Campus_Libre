import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Router} from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario={
    email:'',
    contrasena:''
  };

  usuariosAlmacenados={
    email:'test@gmail.com',
    contrasena:'12345' 
  };

  router=inject(Router);

  validarLogin(email:string,contrasena:string):boolean{
    return email===this.usuariosAlmacenados.email && contrasena===this.usuariosAlmacenados.contrasena;
  }

  Login(){
    if(this.validarLogin(this.usuario.email, this.usuario.contrasena)){
      localStorage.setItem('LoggedInUser', JSON.stringify(this.usuario.email));
      this.router.navigate(['/dashboard']);
    }else{
      alert('error mi pana');
    }
  }
}
