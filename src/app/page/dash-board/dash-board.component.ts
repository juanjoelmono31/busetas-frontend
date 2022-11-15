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
import { InfoVehiculosComponent } from '../info-vehiculos/info-vehiculos/info-vehiculos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  dataUser: any;
  UserRol: string = "";
  infoRodamiento: any
  listasRutas: any = []
  listaRutasFecha: any = []
  listasusuarios: any = []
  listaVehiculos: any = []
  rodamientoVehiculo: any;
  basico = 20000
  valorPasaje = 2080;
  valores = 0
  sumaNetosDiarios = 0;
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  Fecha: any;

  estadoBtn: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document, private service_vehiculos: VehiculoService, private service_controlVehiculo: ControlVehiculoService, private service_conductor: ConductorService, public dialog: MatDialog, private service_rodamiento: RodamientoService, private exportService: ExporterService, public router: Router) { }

  ngOnInit(): void {

    this.Fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy')
    console.log('Esta es la fecha actual', this.Fecha);
    

    this.dataUser = JSON.parse(localStorage.getItem('infoUser')!)
    this.UserRol = this.dataUser.conductor[0].rol
    console.log('ACAAAAAAAA ESTA EL ID DEL VEHICULO', this.dataUser.conductor[0].rol)

    this.service_vehiculos.getVehiculoID(this.dataUser.conductor[0].vehiculo).subscribe((data: any) => {
      console.log("REPSUESTA VEHICULO", data);
      this.rodamientoVehiculo = data.rodamiento;
    })

    this.service_vehiculos.getVehiculo().subscribe((data) => {
      this.listaVehiculos = data
      console.log("VEHICULOS", this.listaVehiculos);
      
    })


    this.service_controlVehiculo.getControlVehiculo().subscribe((data) => {
      this.listasRutas = data

      console.log("LISTADO DE RUTAS", this.listasRutas);

      
      for (let index = 0; index < this.listasRutas.length; index++) {
        if (this.listasRutas[index].placa === this.listasRutas[index].placa) {

          if(this.listasRutas[index].fecha === this.Fecha){
            this.listaRutasFecha.push(this.listasRutas[index])
          }
          
          
          
          const element = this.listasRutas[index].neto_total;
          // const sumaNetos = element + element
          // console.log('Totales netos', sumaNetos);
          
        }
        
      }
      console.log("LISTA CON FECHA DE HOY",this.listaRutasFecha );

      for (let index = 0; index < this.listaRutasFecha.length; index++) {        
        const valorNetoTotal = this.listaRutasFecha[index].neto_total;
        this.sumaNetosDiarios = valorNetoTotal + this.sumaNetosDiarios;
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
      this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=> this.router.navigate(["/dashboard"]));
    });
  }

  openInfoVehiculo(placa:string) {
    console.log('esta es la placa', placa);
    const dialogRef = this.dialog.open(InfoVehiculosComponent, {
      
      width: '1500px',
      data: { placa }
    });
  }
}


