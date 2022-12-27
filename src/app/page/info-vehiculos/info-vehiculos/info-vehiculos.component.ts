import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ControlVehiculoService } from 'src/app/services/control-vehiculo/control-vehiculo.service';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';

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
  valorPasaje = 2080;
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

    this.service_vehiculo.getVehiculoID(this.placa.id).subscribe((data: any)=>{
      this.listaGastos = data.gastos_admin
      this.listaMantenimiento = data.mantenimiento_taller
      this.calculosAdmin();
      this.clalculosMantenimiento();
      this.calcularLiquidoTotal();
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
      valor_mantenimiento: ['', Validators.required]
    })

    this.mantenimiento_taller.push(lessonForm)
  }

  crearGastosAdmin() {
    for (let index = 0; index < this.formInfoVehiculos.value.gastos_admin.length; index++) {
        const element = this.formInfoVehiculos.value.gastos_admin[index];
        this.formInfoVehiculos.value.gastos_admin[index].fechaGasto =  this.pipe.transform(Date.now(), 'MM/dd/yyyy')
        this.listaGastos.push(element)
      }

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
      this.formInfoVehiculos.value.mantenimiento_taller[index].fechaMantemiento = this.pipe.transform(Date.now(), 'MM/dd/yyyy')
      this.listaMantenimiento.push(element)
      console.log("LISTA MANTENIMIENTO", this.listaMantenimiento);
      
    }
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
  }

  selectMes(fecha: string) {
    
    this.fechaArray = moment(fecha).format('MMMM');  
    console.log(this.fechaArray);
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
    this.sumaNetos = 0;
  }


  calculosAdmin() {
    
    for (let index = 0; index < this.listaGastos.length; index++) {
      const element = this.listaGastos[index].valor;
      this.valores = element + this.valores
    }
    console.log("ESTOS SON LOS VALORES", this.valores);
  }

  clalculosMantenimiento() {
    for (let index = 0; index < this.listaMantenimiento.length; index++) {
      const element = this.listaMantenimiento[index].valor_mantenimiento;
      this.valoresMantenimientos = element + this.valoresMantenimientos
    }
    console.log("ESTOS SON LOS VALORES SUMADOS DE LOS MANTENIMIENTOS", this.valoresMantenimientos);
    
  }

  calcularLiquidoTotal(){
    console.log("LIQUIDO TOTAL = ", Number(this.sumaNetos - this.valores - this.valoresMantenimientos));
    this.liquidoTotal = Number(this.sumaNetos - this.valores - this.valoresMantenimientos);
  }

}


