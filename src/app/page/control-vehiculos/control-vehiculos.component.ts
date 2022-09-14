import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import { ControlVehiculoService } from 'src/app/services/control-vehiculo/control-vehiculo.service';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';
import * as alertify from 'alertifyjs'
import { MatDialog } from '@angular/material/dialog';
import { ListCoductoresComponent } from '../list-coductores/list-coductores.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-control-vehiculos',
  templateUrl: './control-vehiculos.component.html',
  styleUrls: ['./control-vehiculos.component.scss']
})
export class ControlVehiculosComponent implements OnInit {

  formControlVehiculo!: FormGroup;
  listConductores: any = [] 
  listPlacas: any = []
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  Fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy')
  dataUser: any;
  conductor: any

  constructor(private service_controlVehiculo: ControlVehiculoService, private service_conductor: ConductorService, private service_vehiculo: VehiculoService, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.Fecha);
  
    this.dataUser = JSON.parse(localStorage.getItem('infoUser')!);
    this.conductor = (this.dataUser.conductor[0]);
    
    
    
  //   alertify.prompt("This is a prompt dialog.", "Default value",
  // function(evt: any, value: string ){
  //   alertify.success('Ok: ' + value);
  //   console.log("ACA", value);
    
  // },
  // function(){
  //   alertify.error('Cancel');
    
  // })
 
 


    this.crearForm();


    this.service_controlVehiculo.getControlVehiculo().subscribe((data) => {
      console.log("LLEGA INFO DEL SERVICIO", data);
      
    })

    this.service_conductor.getCoductor().subscribe((data) => {
      console.log("LLEGA INFO DEL SERVICIO", data);

      this.listConductores = data
      
    })

    this.service_vehiculo.getVehiculo().subscribe((data) => {
      console.log("LLEGA INFO DEL SERVICIO", data);

      this.listPlacas = data
      
    })
  }
  borrarDatos() {
    
  }
  openDialog() {
    const dialogRef = this.dialog.open(ListCoductoresComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  crearForm(){
    this.formControlVehiculo = this.fb.group({

      fecha: [this.Fecha, Validators.required],
      ruta: ['', Validators.required],
      numero_vueltas: ['', Validators.required],
      numero_buseta: ['', Validators.required],
      reg_salida: ['', Validators.required],
      reg_llegada: ['', Validators.required],
      gastos: ['', Validators.required],
      neto_total: ['', Validators.required],
      conductor: ['', Validators.required],
      placa: ['', Validators.required],
      estado: ['En ruta', Validators.required],
    })

  }

  crearControlVehiculo() {
    console.log(this.formControlVehiculo.value);

    this.service_controlVehiculo.postControlVehiculo(this.formControlVehiculo.value).subscribe((data: any)=>{
      console.log("REPSUESTA DE POST", data);
      if(data.message = true){
        alertify.success('Ruta asignada correctamente');
      }
      
    })
  }
}
