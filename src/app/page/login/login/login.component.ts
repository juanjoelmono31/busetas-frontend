import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConductorService } from 'src/app/services/conductor/conductor.service';

import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup

  constructor(private fb: FormBuilder, private loginService: ConductorService, private router: Router ) { }

  ngOnInit(): void {
    this.createFrom()
  }

  createFrom() {
    this.formLogin = this.fb.group({
      cedula: ['', Validators.required]
    })
  }

  ingresar() {
    this.loginService.getUserFind(this.formLogin.value.cedula).subscribe(
      (data: any) => {
        console.log(data)
        //localStorage.setItem("Conductor", JSON.stringify(data.conductor[0]));
        if (data.conductor.length >0 ){
          localStorage.setItem('cedula', this.formLogin.value.cedula)
          alertify.success('Inicio de sesion con exito');
          
          localStorage.setItem('infoUser', JSON.stringify(data))
          this.router.navigate(['/dashboard'])

        } else {
          alertify.alert('La cedula ingresada no existe', function () { alertify.error('Error en inicio de sesion '); });
        }
      }
    )
  }


}
