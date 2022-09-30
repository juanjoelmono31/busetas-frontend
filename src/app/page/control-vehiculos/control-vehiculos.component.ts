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
  Ruta: any;
  Placa: any;

  constructor(private service_controlVehiculo: ControlVehiculoService, private service_conductor: ConductorService, private service_vehiculo: VehiculoService, private fb: FormBuilder, public dialog: MatDialog) { 
    this.dataUser = JSON.parse(localStorage.getItem('infoUser')!);
    this.conductor = (this.dataUser.conductor[0]);
    console.log("Vehiculo usuario", this.conductor);
    this.service_vehiculo.getVehiculoID(this.conductor.vehiculo).subscribe((data: any)=>{
      this.Ruta = data.rodamiento.numero_ruta
      this.Placa = data.placa

      
      
      console.log("SERVICIO DEL ID VEHICULO", data);
    })
  }

  ngOnInit(): void {
    this.crearForm();
    
  //   alertify.prompt("This is a prompt dialog.", "Default value",
  // function(evt: any, value: string ){
  //   alertify.success('Ok: ' + value);
  //   console.log("ACA", value);
    
  // },
  // function(){
  //   alertify.error('Cancel');
    
  // })
 
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
      ruta: [this.Ruta, Validators.required],
      numero_vueltas: ['', Validators.required],
      //numero_buseta: ['', Validators.required],
      reg_salida: ['', Validators.required],
      reg_llegada: ['', Validators.required],
      gastos: ['', Validators.required],
      neto_total: ['', Validators.required],
      conductor: [this.conductor, Validators.required],
      placa: [this.Placa, Validators.required],
      estado: ['En ruta', Validators.required],
    })

  }

  crearControlVehiculo() {
    this.formControlVehiculo.value.ruta = this.Ruta
    this.formControlVehiculo.value.placa = this.Placa

    console.log("------------",this.formControlVehiculo.value);
    
    this.service_controlVehiculo.postControlVehiculo(this.formControlVehiculo.value).subscribe((data: any)=>{
      console.log("REPSUESTA DE POST", data);
      if(data.message = true){
        alertify.success('Ruta asignada correctamente');
      }     
    })
  }
}
