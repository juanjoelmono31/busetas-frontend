import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import { ControlVehiculoService } from 'src/app/services/control-vehiculo/control-vehiculo.service';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';
import * as alertify from 'alertifyjs'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  panelOpenState = false;
  dataUser: any;
  conductor: any
  Ruta: any;
  Placa: any;
  bonificacion: any
  valorPasaje = 2080;
  basico = 20000;
  pasajeros: any;
  valores = 0;
  sumaGastos = 0;

  constructor(private service_controlVehiculo: ControlVehiculoService, private service_conductor: ConductorService, private service_vehiculo: VehiculoService, private fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {infoControl: object}) { 
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
      neto_total: ['', Validators.required],
      conductor: [this.conductor, Validators.required],
      placa: [this.Placa, Validators.required],
      estado: ['En ruta', Validators.required],
      acpm: ['', Validators.required],
      montaje_llantas: ['', Validators.required],
      total_gastos: ['', Validators.required],
      bonificacion: ['', Validators.required],
      otros: this.fb.array([])
    })

  }

  get otros() {
    return this.formControlVehiculo.get('otros') as FormArray;
  }

  crearControlVehiculo() {
    this.CalculoBonificacion();

    this.formControlVehiculo.value.ruta = this.Ruta
    this.formControlVehiculo.value.placa = this.Placa
    this.formControlVehiculo.value.bonificacion = this.bonificacion

    for (let index = 0; index < this.formControlVehiculo.value.otros.length; index++) {
      const element = this.formControlVehiculo.value.otros[index].valor;
      this.valores = element + this.valores;
    }
   
    this.sumaGastos = (this.basico + this.valores + this.formControlVehiculo.value.acpm + this.formControlVehiculo.value.montaje_llantas + this.bonificacion)
    this.formControlVehiculo.value.total_gastos = this.sumaGastos
    
    console.log('suma gastos', this.sumaGastos);
    

    const Producido = this.pasajeros * this.valorPasaje
    this.formControlVehiculo.value.neto_total = (Producido - this.formControlVehiculo.value.total_gastos)
    
    // console.log("Producido diario", Producido);
    // console.log("Otros", this.formControlVehiculo.value.otros);    
    console.log("Neto total", this.formControlVehiculo.value.neto_total);
    console.log("------------",this.formControlVehiculo.value.total_gastos);    

    this.service_controlVehiculo.postControlVehiculo(this.formControlVehiculo.value).subscribe((data: any)=>{
      console.log("REPSUESTA DE POST", data);
      if(data.message = true){
        alertify.success('Control creado correctamente');
        //alertify.success('Esta es la Bonificacion de esta ruta' + this.bonificacion);
      }     
    })
  }

  agregarOtros() {
    const lessonForm = this.fb.group({
      descripcion: [''],
      valor: [''],
    });

    this.otros.push(lessonForm);
  }

  CalculoBonificacion() {
    this.pasajeros = this.formControlVehiculo.value.reg_llegada - this.formControlVehiculo.value.reg_salida;
       
    if (this.pasajeros >= 200 && this.pasajeros < 250) {
      return (this.bonificacion = 10000)
    } else if (this.pasajeros >= 250 && this.pasajeros < 300){
      return (this.bonificacion = 20000)
    }else if(this.pasajeros >= 300 && this.pasajeros < 350) {
      return (this.bonificacion = 30000)
    }else if(this.pasajeros >= 350 && this.pasajeros < 400) {
      return (this.bonificacion = 40000)
    } else {
      return this.bonificacion = 0
    }

    

    
    
    
  }
}
