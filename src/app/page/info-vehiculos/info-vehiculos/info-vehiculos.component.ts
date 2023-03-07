import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import * as alertify from 'alertifyjs'
import { ControlVehiculoService } from 'src/app/services/control-vehiculo/control-vehiculo.service';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-info-vehiculos',
  templateUrl: './info-vehiculos.component.html',
  styleUrls: ['./info-vehiculos.component.scss']


})

export class InfoVehiculosComponent implements OnInit {

  

  panelOpenState = false;
  formInfoVehiculos!: FormGroup

  FiltroFecha!: FormGroup
  infoVehiculo: any = []
  valorPasaje = 2380;
  basico = 20000;

  infoVehiculosMes: any = [];
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  Fecha: any;
  sumaNetos = 0;
  sumaPasajeros = 0;
  totalACPM = 0
  totalBasicos = 0
  totalGastos = 0
  totalBonificaciones = 0
  valores = 0
  valoresMantenimientos = 0
  value: any;
  fechaArray : any;
  listGastos: any = ['Rodamiento', 'Seguro', 'Conductor (fijo)', 'Conductor (relevo)', 'Otros']
  listaGastos: any;
  listaMantenimiento: any;
  liquidoTotal = 0;

  listaGastosAdminMes : any= [];
  listaGastosTallerMes : any= [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;


  constructor(@Inject(MAT_DIALOG_DATA) public placa: any, @Inject(DOCUMENT) private document: Document, private exportService: ExporterService, private service_controlVehiculo: ControlVehiculoService, private fb: FormBuilder, private service_vehiculo: VehiculoService,) {
    this.FiltroFecha = this.fb.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required]
    })    
  }
  

  ngOnInit(): void {
    this.crearFrom()
    
    

    this.service_vehiculo.getVehiculo().subscribe((data: any) =>{
      console.log("LLEGA INFO DEL SERVICIO DEL VEHICULO", data);
    })


        
    this.placasFind();
    this.selectMes(this.fechaArray);
    
  }

  

  crearFrom() {
    this.formInfoVehiculos = this.fb.group({
      gastos_admin: this.fb.array([]),
      mantenimiento_taller: this.fb.array([]),
    })



  }

  agregarGastosAdmin(){
    const lessonForm = this.fb.group({
      fechaGasto: [''],
      descripcion: ['', Validators.required],
      valor: ['', Validators.required]
    })

    this.gastos_admin.push(lessonForm);
  }

  agregarMantenimiento() {
    const lessonForm = this.fb.group({
      fechaMantemiento: [''],
      descripcion_mantenimiento: ['', Validators.required],
      detalle: ['', Validators.required],
      valor_mantenimiento: ['', Validators.required]
    })

    this.mantenimiento_taller.push(lessonForm)
  }

  crearGastosAdmin() {
    for (let index = 0; index < this.formInfoVehiculos.value.gastos_admin.length; index++) {
        const element = this.formInfoVehiculos.value.gastos_admin[index];
        this.formInfoVehiculos.value.gastos_admin[index].fechaGasto =  this.pipe.transform(this.formInfoVehiculos.value.gastos_admin[index].fechaGasto, 'MM/dd/yyyy')
        this.listaGastos.push(element)
      }
      alertify.success('Gasto creado')

      const gastosAdmin = {
        gastos_admin:
          this.listaGastos
      }
      this.service_vehiculo.putGastosAdmin(this.placa.id, gastosAdmin).subscribe((response: any) => {
      })
  }

  crearMantenimientoTaller() {
    for (let index = 0; index < this.formInfoVehiculos.value.mantenimiento_taller.length; index++) {
      const element = this.formInfoVehiculos.value.mantenimiento_taller[index];
      this.formInfoVehiculos.value.mantenimiento_taller[index].fechaMantemiento = this.pipe.transform(this.formInfoVehiculos.value.mantenimiento_taller[index].fechaMantemiento, 'MM/dd/yyyy')
      this.listaMantenimiento.push(element)      
    }
    alertify.success('Mantenimiento creado')
    const mantenimientoTaller = {
      mantenimiento_taller:
        this.listaMantenimiento
    }
    this.service_vehiculo.putMantenimiento_taller(this.placa.id, mantenimientoTaller).subscribe((response: any) => {

    })
  }
  
  get gastos_admin() {
    return this.formInfoVehiculos.get('gastos_admin') as FormArray;
  }

  get mantenimiento_taller() {
    return this.formInfoVehiculos.get('mantenimiento_taller') as FormArray;
  }


  placasFind() {
    
    this.service_controlVehiculo.getCtrlPlaca(this.placa.placa).subscribe(
      (data: any) => {
        this.infoVehiculo = data['Placa']
      }
    )
  }

  SendDataonChange(event: any) {
    this.limpiarTotales();
    const fechaSelect = moment(event.target.value).format('MMMM');
    
    for (let index = 0; index < this.infoVehiculo.length; index++) {
      const fecha = this.infoVehiculo[index].fecha;
    
      this.selectMes(fecha);
      const valorNetoTotal = this.infoVehiculo[index].neto_total;
      if (this.fechaArray === fechaSelect) {    
        this.infoVehiculosMes.push(this.infoVehiculo[index]);
        this.sumaNetos = valorNetoTotal + this.sumaNetos;
        this.sumaTotales(this.infoVehiculo[index]);    
      }
    }
    this.cargarGastos(fechaSelect)
  }

  selectMes(fecha: string) {
    this.fechaArray = moment(fecha).format('MMMM');  
  }

  cargarGastos(fecha: string){

    this.service_vehiculo.getVehiculoID(this.placa.id).subscribe((data: any)=>{
      this.listaGastos = data.gastos_admin
      this.listaMantenimiento = data.mantenimiento_taller
      this.cargarInfoGastosAdmin(fecha);
      this.cargarInfoGastosTaller(fecha);
      // this.clalculosMantenimiento();
      this.calcularLiquidoTotal();
    })
    
  }

  cargarInfoGastosAdmin(fecha: string){
    
    for (let index = 0; index < this.listaGastos.length; index++) {
      const elemntfecha = this.listaGastos[index].fechaGasto;
      const fechaGastos = moment(elemntfecha).format('MMMM');
       
      // comparar mes seleccionado con el mes del elemneto de la lista de gastos
      if(fechaGastos === fecha){
        this.listaGastosAdminMes.push(this.listaGastos[index])
      }
    }
    this.calculosAdmin();
    console.log("GASTOS ADMIN DEL MES ", this.listaGastosAdminMes);
    
  }

  cargarInfoGastosTaller(fecha: string){
    for (let index = 0; index < this.listaMantenimiento.length; index++) {
      const elemntfecha = this.listaMantenimiento[index].fechaMantemiento;
      const fechaGastos = moment(elemntfecha).format('MMMM');
       
      // comparar mes seleccionado con el mes del elemneto de la lista de gastos
      if(fechaGastos === fecha){
        this.listaGastosTallerMes.push(this.listaMantenimiento[index])
      }
    }
    this.clalculosMantenimiento();
    console.log("GASTOS TALLER DEL MES ", this.listaGastosTallerMes);
    
  }

  exportAsXLSX() {
    this.exportService.exportToExcel(this.infoVehiculosMes, 'info_mes');
  }

  sumaTotales(data: any) {
    const pasajeros = Number(data.reg_llegada - data.reg_salida);
    this.sumaPasajeros = pasajeros + this.sumaPasajeros
    this.totalACPM = Number(data.acpm + this.totalACPM);
    this.totalBonificaciones = Number(data.bonificacion + this.totalBonificaciones);
    this.totalBasicos = Number(this.basico + this.totalBasicos);
    this.totalGastos = Number(data.total_gastos + this.totalGastos);
  }

  limpiarTotales() {
    this.sumaPasajeros = 0;
    this.totalACPM = 0;
    this.totalBonificaciones = 0;
    this.totalBasicos = 0;
    this.totalGastos = 0;
    this.infoVehiculosMes = [];
    this.listaGastosAdminMes = [];
    this.listaGastosTallerMes = [];
    this.sumaNetos = 0;
    this.valores = 0;
    this.valoresMantenimientos = 0;
    this.liquidoTotal = 0;
  }


  calculosAdmin() {
    for (let index = 0; index < this.listaGastosAdminMes.length; index++) {
      const element = this.listaGastosAdminMes[index].valor;
      this.valores = element + this.valores
    }
    console.log("ESTOS SON LOS VALORES", this.valores);
  }

  clalculosMantenimiento() {
    for (let index = 0; index < this.listaGastosTallerMes.length; index++) {
      const element = this.listaGastosTallerMes[index].valor_mantenimiento;
      this.valoresMantenimientos = element + this.valoresMantenimientos
    }
    console.log("ESTOS SON LOS VALORES SUMADOS DE LOS MANTENIMIENTOS", this.valoresMantenimientos);
    
  }

  calcularLiquidoTotal(){
    console.log("LIQUIDO TOTAL = ", Number(this.sumaNetos - this.valores - this.valoresMantenimientos));
    this.liquidoTotal = Number(this.sumaNetos - this.valores - this.valoresMantenimientos);
  }

}


