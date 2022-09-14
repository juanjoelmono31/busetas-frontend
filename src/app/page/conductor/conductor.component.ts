import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.scss']
})
export class ConductorComponent implements OnInit {

  formConductor!: FormGroup;
  listConductores : any =[];
  constructor(private service_conductor : ConductorService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.crearForm();
    this.service_conductor.getCoductor().subscribe((data )=>{
      console.log("LLEGA INFO DEL SERVICIO", data);
      this.listConductores = data;
      
    })
  }

  borrarDatos(){
    
  }

  crearForm(){
    this.formConductor = this.fb.group({
      //DATOS BASICOS
      nombre: ['', Validators.required],
      cedula: ['', Validators.required],
      numero_celular: ['', Validators.required],
    
    });
  }

  createConductor(){
    console.log(this.formConductor.value);

    this.service_conductor.postConductor(this.formConductor.value).subscribe((data: any)=>{
      console.log("REPSUESTA DE POST", data);
      if(data.message = true){
        alertify.success('Conductor creado correctamente');
      }
      
    })
    

  }

}
