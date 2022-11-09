import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ControlVehiculoService } from 'src/app/services/control-vehiculo/control-vehiculo.service';

@Component({
  selector: 'app-info-vehiculos',
  templateUrl: './info-vehiculos.component.html',
  styleUrls: ['./info-vehiculos.component.scss']
})
export class InfoVehiculosComponent implements OnInit {

  FiltroFecha!: FormGroup
  infoVehiculo: any =[]
  valorPasaje = 2080;
  basico = 20000;

  constructor(@Inject(MAT_DIALOG_DATA) public placa: any, private service_controlVehiculo: ControlVehiculoService, private fb: FormBuilder) {
    this.FiltroFecha = this.fb.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    console.log('id que llega', this.placa);
    this.placasFind()
  }

  placasFind(){
    this.service_controlVehiculo.getCtrlPlaca(this.placa.placa).subscribe(
      (data: any) => {
        this.infoVehiculo = data['Placa']
        console.log('DATA', this.infoVehiculo);
        
      }
    )
    
    
  }

  CapturaFecha(){

  }

}
