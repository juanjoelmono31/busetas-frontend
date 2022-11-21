import { Component, Inject, OnInit } from '@angular/core';
import { RodamientoService } from 'src/app/services/rodamiento/rodamiento.service';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';
import { DatePipe, DOCUMENT } from '@angular/common';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { MatDialog } from '@angular/material/dialog';
import { RodamientosComponent } from '../rodamientos/rodamientos/rodamientos.component';
import * as moment from 'moment';

@Component({
  selector: 'app-list-rodamineto',
  templateUrl: './list-rodamineto.component.html',
  styleUrls: ['./list-rodamineto.component.scss']
})
export class ListRodaminetoComponent implements OnInit {
  listRodamiento: any = []
  listVehiculos: any = []
  listaRodamientosFecha: any = []
  list: any = []
  placa: any =[]
  numero: any = []
  Fecha: any
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  constructor(@Inject(DOCUMENT) private document: Document, private service_rodamiento: RodamientoService, private service_vehiculos: VehiculoService, private exportService: ExporterService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.Fecha = this.pipe.transform(Date.now(), 'MM/dd/yyyy')
    console.log('Esta es la fecha actual', this.Fecha);
    
    this.service_vehiculos.getVehiculo().subscribe((data: any) => {
      this.listVehiculos = data
      this.service_rodamiento.getRodamiento().subscribe((data: any) => {
        console.log("LLEGA INFO DEL SERVICIO", data)
        this.listRodamiento = data

        for (let index = 0; index < this.listRodamiento.length; index++) {
          if(this.listRodamiento[index].fecha === this.Fecha){
            this.listaRodamientosFecha.push(this.listRodamiento[index])
          }
        }
        console.log('ACAAAAAAAAAAAAA', this.listaRodamientosFecha)

        console.log("Lista vehiculos ", this.listVehiculos)
        for (let index = 0; index < this.listRodamiento.length; index++) {
          const element = this.listRodamiento[index].numero_buseta;
          //console.log(element)
          for (let j = 0; j < this.listVehiculos.length; j++) {
            const elementVehiculos = this.listVehiculos[j]._id;
            //console.log(elementVehiculos);
            
            if (element === elementVehiculos) {
              // this.placa = this.listVehiculos[j].placa
              // this.numero = this.listVehiculos[j].numero
              this.placa.push(this.listVehiculos[j].placa)
              this.numero.push(this.listVehiculos[j].numero)
              // console.log("ID Iguales", this.placa);
              // console.log("Numero", this.numero);
              
            }
            // console.log("Placa", this.placa);
            // console.log("Numero", this.numero);
            
            
          }
          
        }
      })
    })


  }
  recargar() {
    this.listaRodamientosFecha = []
    this.ngOnInit()
  }
  exportAsXLSX() {
    this.exportService.exportToExcel(this.listaRodamientosFecha, 'info_rodamientos');
  }

  openDialog(){
    const dialogRef = this.dialog.open(RodamientosComponent, {
      height: '500px',
      width: '500px'
    }
      );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
