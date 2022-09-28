import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { hide } from '@popperjs/core';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import { ControlVehiculoService } from 'src/app/services/control-vehiculo/control-vehiculo.service';
import { ConductorComponent } from '../conductor/conductor.component';
import { ControlVehiculosComponent } from '../control-vehiculos/control-vehiculos.component';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  listasRutas: any = []
  listasusuarios: any = []
  
  constructor(private service_controlVehiculo: ControlVehiculoService, private service_conductor: ConductorService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.service_conductor.getCoductor().subscribe((data) => {
      this.listasusuarios = data     
    })
    this.service_controlVehiculo.getControlVehiculo().subscribe((data) => {
      this.listasRutas = data
    })

  }

  openDialog(){
    const dialogRef = this.dialog.open(ControlVehiculosComponent, {
      height: '654px',
      width: '800px'
    }
      );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  }


