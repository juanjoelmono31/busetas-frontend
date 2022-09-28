import { Component, Inject, OnInit } from '@angular/core';
import { RodamientoService } from 'src/app/services/rodamiento/rodamiento.service';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';
import { DOCUMENT } from '@angular/common';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { MatDialog } from '@angular/material/dialog';
import { RodamientosComponent } from '../rodamientos/rodamientos/rodamientos.component';

@Component({
  selector: 'app-list-rodamineto',
  templateUrl: './list-rodamineto.component.html',
  styleUrls: ['./list-rodamineto.component.scss']
})
export class ListRodaminetoComponent implements OnInit {
  listRodamiento: any = []
  listVehiculos: any = []
  list: any = []
  placa: any =[]
  numero: any = []
  constructor(@Inject(DOCUMENT) private document: Document, private service_rodamiento: RodamientoService, private service_vehiculos: VehiculoService, private exportService: ExporterService, public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.service_vehiculos.getVehiculo().subscribe((data: any) => {
      this.listVehiculos = data
      this.service_rodamiento.getRodamiento().subscribe((data: any) => {
        console.log("LLEGA INFO DEL SERVICIO", data)
        this.listRodamiento = data
        console.log("Lista vehiculos ", this.listVehiculos)
        for (let index = 0; index < this.listRodamiento.length; index++) {
          const element = this.listRodamiento[index].numero_buseta;
          console.log(element)
          for (let j = 0; j < this.listVehiculos.length; j++) {
            const elementVehiculos = this.listVehiculos[j]._id;
            console.log(elementVehiculos);
            
            if (element === elementVehiculos) {
              // this.placa = this.listVehiculos[j].placa
              // this.numero = this.listVehiculos[j].numero
              this.placa.push(this.listVehiculos[j].placa)
              this.numero.push(this.listVehiculos[j].numero)
              console.log("ID Iguales", this.placa);
              console.log("Numero", this.numero);
              
            }
            console.log("Placa", this.placa);
            console.log("Numero", this.numero);
            
            
          }
          
        }
      })
    })
  }

  exportAsXLSX() {
    this.exportService.exportToExcel(this.listRodamiento, 'info_rodamientos');
  }

  openDialog(){
    const dialogRef = this.dialog.open(RodamientosComponent, {
      height: '100%',
      width: '100px'
    }
      );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
