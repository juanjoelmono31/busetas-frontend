import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { hide } from '@popperjs/core';
import { DOCUMENT } from '@angular/common';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import { ControlVehiculoService } from 'src/app/services/control-vehiculo/control-vehiculo.service';
import { RodamientoService } from 'src/app/services/rodamiento/rodamiento.service';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';
import { ConductorComponent } from '../conductor/conductor.component';
import { ControlVehiculosComponent } from '../control-vehiculos/control-vehiculos.component';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  dataUser: any;
  infoRodamiento: any
  listasRutas: any = []
  listasusuarios: any = []
  listaVehiculos: any = []
  rodamientoVehiculo: any;
  basico = 20000
  valorPasaje = 2080;
  valores = 0

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  Fecha: any;

  estadoBtn: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document, private service_vehiculos: VehiculoService, private service_controlVehiculo: ControlVehiculoService, private service_conductor: ConductorService, public dialog: MatDialog, private service_rodamiento: RodamientoService, private exportService: ExporterService) { }

  ngOnInit(): void {
    this.Fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy')

    this.dataUser = JSON.parse(localStorage.getItem('infoUser')!)
    console.log('ACAAAAAAAA ESTA EL ID DEL VEHICULO', this.dataUser.conductor[0].vehiculo)

    this.service_vehiculos.getVehiculoID(this.dataUser.conductor[0].vehiculo).subscribe((data: any) => {
      console.log("REPSUESTA VEHICULO", data);
      this.rodamientoVehiculo = data.rodamiento;
    })

    this.service_vehiculos.getVehiculo().subscribe((data) => {
      this.listaVehiculos = data
    })


    this.service_controlVehiculo.getControlVehiculo().subscribe((data) => {
      this.listasRutas = data

      console.log("LISTADO DE RUTAS", this.listasRutas);

      debugger
      for (let index = 0; index < this.listasRutas.length; index++) {
        if (this.listasRutas[index].placa === this.listasRutas[index].placa) {

          const element = this.listasRutas[index].neto_total;
          // const sumaNetos = element + element
          // console.log('Totales netos', sumaNetos);

        }

      }

      for (let index = 0; index < this.listasRutas.length; index++) {
        const element = this.listasRutas[index].otros[index];
        this.valores = element + this.valores;
        console.log('aca esta el element', element);

      }


      if (this.listasRutas.estado = ! 'En ruta') {
        this.estadoBtn = true
      } else {
        this.estadoBtn = false
      }
    })

    // this.service_rodamiento.getRodamientoId('633776e585927bc79c20f151').subscribe((data)=> {
    //   console.log('Info del rodamiento',data);
    //   this.infoRodamiento = data
    //   console.log('ID VEHICULO de rodamiento ',this.infoRodamiento.numero_buseta._id);


    // })








  }


  exportAsXLSX() {
    this.listasRutas.otros = this.valores
    this.exportService.exportToExcel(this.listasRutas, 'info_rodamientos');
    console.log('**********************', this.valores);

  }
  openDialog() {
    const dialogRef = this.dialog.open(ControlVehiculosComponent, {
      height: '600px',
      width: '500px'
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


