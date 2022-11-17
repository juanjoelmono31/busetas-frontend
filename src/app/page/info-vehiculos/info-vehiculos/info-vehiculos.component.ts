import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ControlVehiculoService } from 'src/app/services/control-vehiculo/control-vehiculo.service';


@Component({
  selector: 'app-info-vehiculos',
  templateUrl: './info-vehiculos.component.html',
  styleUrls: ['./info-vehiculos.component.scss']
})
export class InfoVehiculosComponent implements OnInit {
  panelOpenState = false;

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
  

  constructor(@Inject(MAT_DIALOG_DATA) public placa: any, private service_controlVehiculo: ControlVehiculoService, private fb: FormBuilder) {
    this.FiltroFecha = this.fb.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.placasFind()
  }

  placasFind() {
    this.service_controlVehiculo.getCtrlPlaca(this.placa.placa).subscribe(
      (data: any) => {
        this.infoVehiculo = data['Placa']
        console.log(data);

      }
    )
  }

  SendDataonChange(event: any) {
    this.limpiarTotales();
    
    const fechaSelect = moment(event.target.value).format('MMMM');
    for (let index = 0; index < this.infoVehiculo.length; index++) {
      const fecha = this.infoVehiculo[index].fecha;
      const fechaTranform = this.pipe.transform(fecha, 'yyyy-dd-MM');
      const element = moment(fechaTranform).format('MMMM');
      const valorNetoTotal = this.infoVehiculo[index].neto_total;
      if (element === fechaSelect) {
        this.infoVehiculosMes.push(this.infoVehiculo[index]);
        this.sumaNetos = valorNetoTotal + this.sumaNetos;
        this.sumaTotales(this.infoVehiculo[index]);
      }
    }
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
}
