import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { hide } from '@popperjs/core';
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
  rodamientoVehiculo: any;

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  Fecha : any ;

  estadoBtn : boolean = false;
  
  constructor(private service_vehiculos: VehiculoService, private service_controlVehiculo: ControlVehiculoService, private service_conductor: ConductorService, public dialog: MatDialog, private service_rodamiento: RodamientoService) { }

  ngOnInit(): void {
   this.Fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy')

   this.dataUser = JSON.parse(localStorage.getItem('infoUser')!)
   console.log('ACAAAAAAAA ESTA EL ID DEL VEHICULO', this.dataUser.conductor[0].vehiculo)

   this.service_vehiculos.getVehiculoID(this.dataUser.conductor[0].vehiculo).subscribe((data : any)=>{
       console.log("REPSUESTA VEHICULO", data);
       this.rodamientoVehiculo = data.rodamiento;
   })

    // this.service_conductor.getCoductor().subscribe((data) => {
    //   this.listasusuarios = data     
    // })
    this.service_controlVehiculo.getControlVehiculo().subscribe((data) => {
      this.listasRutas = data

      console.log("Rutas", this.listasRutas);
      

      if(this.listasRutas.estado =! 'En ruta'){
        this.estadoBtn = true
      }else{
        this.estadoBtn = false
      }
    })

    // this.service_rodamiento.getRodamientoId('633776e585927bc79c20f151').subscribe((data)=> {
    //   console.log('Info del rodamiento',data);
    //   this.infoRodamiento = data
    //   console.log('ID VEHICULO de rodamiento ',this.infoRodamiento.numero_buseta._id);
      
     
    // })

  

    
  
   


  }

  openDialog(){
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


