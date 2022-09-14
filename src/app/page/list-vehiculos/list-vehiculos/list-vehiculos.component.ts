import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';
import { VehiculosComponent } from '../../vehiculos/vehiculos.component';

@Component({
  selector: 'app-list-vehiculos',
  templateUrl: './list-vehiculos.component.html',
  styleUrls: ['./list-vehiculos.component.scss']
})
export class ListVehiculosComponent implements OnInit {

  listVehiculos: any = []

  constructor(private service_vehiculos: VehiculoService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.service_vehiculos.getVehiculo().subscribe((data) => {
      console.log("LLEGA INFO DEL SERVICIO", data);
      this.listVehiculos = data
      
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(VehiculosComponent, {
      height: '600px',
      width: '800px'
    }
      );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
