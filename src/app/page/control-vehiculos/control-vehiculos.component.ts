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
  Fecha = this.pipe.transform(Date.now(), 'MM/dd/yyyy')
  panelOpenState = false;
  dataUser: any;
  conductor: any
  Ruta: any;
  fechaRodamiento: any;
  Placa: any;
  bonificacion: any
  valorPasaje = 2380;
  basico = 20000;
  pasajeros: any;
  valores = 0;
  sumaGastos = 0;
  netoVehiculo = 0
  panelOpen = false;
  info=false
  otrosGastos: any [] = []

 

  constructor(private service_controlVehiculo: ControlVehiculoService, private service_conductor: ConductorService, private service_vehiculo: VehiculoService, private fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {infoControl: object}) { 
    this.dataUser = JSON.parse(localStorage.getItem('infoUser')!);
    this.conductor = (this.dataUser.conductor[0]);
    console.log("Vehiculo usuario", this.conductor);
    this.service_vehiculo.getVehiculoID(this.conductor.vehiculo).subscribe((data: any)=>{
      this.Ruta = data.rodamiento.numero_ruta
      this.fechaRodamiento = data.rodamiento.fecha
      this.Placa = data.placa     
      this.netoVehiculo = data.netoTotal
      console.log("SERVICIO DEL ID VEHICULO", data);
    })
  }

  ngOnInit(): void {
    this.crearForm();
    
 
    this.service_controlVehiculo.getControlVehiculo().subscribe((data) => {
      console.log("LLEGA INFO DEL SERVICIO", data);     
    })

    this.service_conductor.getCoductor().subscribe((data) => {
      console.log("LLEGA INFO DEL SERVICIO", data);
      this.listConductores = data     
    })

    this.service_vehiculo.getVehiculo().subscribe((data) => {
      console.log("LLEGA INFO DEL SERVICIO de vehiculos", data);
      this.listPlacas = data  
    })
  }

  borrarDatos() {
    
  }

  separadorMiles(numero: any){
    let partesNumero = numero.toString().split('.')

    partesNumero[0] = partesNumero[0].replace(/\B(?=(\{3})+(?!\d))/g, ',')

    return partesNumero.join('.')
    
  }

  

  

  openDialog() {
    const dialogRef = this.dialog.open(ListCoductoresComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  crearForm(){
    this.formControlVehiculo = this.fb.group({
      fecha: [this.fechaRodamiento, Validators.required],
      ruta: [this.Ruta, Validators.required],
      numero_vueltas: ['', Validators.required],
      //numero_buseta: ['', Validators.required],
      reg_salida: ['', Validators.required],
      reg_llegada: ['', Validators.required],
      neto_total: [''],
      conductor: [this.conductor, Validators.required],
      placa: [this.Placa, Validators.required],
      estado: ['En ruta', Validators.required],
      acpm: ['', Validators.required],
      //montaje_llantas: ['', Validators.required],
      total_gastos: [''],
      bonificacion: [''],
      otros: this.fb.array([]),
      basico: [''],
      otros_gastos: [''],
    })

  }

  get otros() {
    return this.formControlVehiculo.get('otros') as FormArray;
  }

  crearControlVehiculo() {
    console.log(this.formControlVehiculo.valid);
    console.log(this.formControlVehiculo);
    
    this.CalculoBonificacion();

    this.formControlVehiculo.value.ruta = this.Ruta
    this.formControlVehiculo.value.placa = this.Placa
    this.formControlVehiculo.value.fecha = this.fechaRodamiento
    
    this.formControlVehiculo.value.bonificacion = this.bonificacion
    for (let index = 0; index < this.formControlVehiculo.value.otros.length; index++) {
      const element = this.formControlVehiculo.value.otros[index].valor;
      this.valores = element + this.valores;
      
    }
   
    const Producido = this.pasajeros * this.valorPasaje
   
    this.sumaGastos = (this.basico + this.valores + this.formControlVehiculo.value.acpm + this.bonificacion)
     
    this.formControlVehiculo.value.total_gastos = this.sumaGastos
    this.formControlVehiculo.value.neto_total = (Number(Producido) - Number(this.formControlVehiculo.value.total_gastos))
    this.formControlVehiculo.value.otros_gastos = this.valores

    if (this.formControlVehiculo.value.neto_total <= 0 ) {
      this.formControlVehiculo.value.neto_total = 0
      
    }
    console.log("Neto total", this.formControlVehiculo.value.neto_total);
    
    
    this.service_controlVehiculo.postControlVehiculo(this.formControlVehiculo.value).subscribe((data: any)=>{
      console.log("REPSUESTA DE POST", data);
      if(data.message = true){
        alertify.success('Control creado correctamente');

        const SumaNetosTotales = this.formControlVehiculo.value.neto_total + this.netoVehiculo;
        
        this.service_controlVehiculo.updateNetoTotalVehiculo(this.conductor.vehiculo, SumaNetosTotales).subscribe((data)=>{
          console.log('RESPUETSA UPDATE NETOS ', data);
          
        })
        //alertify.success('Esta es la Bonificacion de esta ruta' + this.bonificacion);
      }     
    })
  }

  agregarOtros() {
    const lessonForm = this.fb.group({
      descripcion: ['', Validators.required],
      valor: ['', Validators.required],
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

  revisarInfo(){
    this.otrosGastos = [];
    console.log(this.formControlVehiculo.value);
    for (let index = 0; index < this.formControlVehiculo.value.otros.length; index++) {
      const Gastos = this.formControlVehiculo.value.otros[index];
      this.otrosGastos.push(Gastos);
    }  
      this.info = true    
  }
}
