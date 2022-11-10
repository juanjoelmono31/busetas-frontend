import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as alertify from 'alertifyjs'
import { RodamientoService } from 'src/app/services/rodamiento/rodamiento.service';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-rodamientos',
  templateUrl: './rodamientos.component.html',
  styleUrls: ['./rodamientos.component.scss']
})
export class RodamientosComponent implements OnInit {
  fromRodamiento!: FormGroup
  selectedValue!: string;
  listVehiculos: any = [];
  listRutas: any = ['#1','#2', '#4/7', '#6', '#8', '#9', '#11', '#14', '#15', '#17', '#18', '#19', '#20', '#21',
'#22', '#23', '#24', '#28', '#29', '#31', '#33', '#35', '#37', '#40', '#43', '#48', '#50', '#53', '#82', '#90' ];

  listLugares: any = ['CABALLERIZAS','PANOPTICO', 'CAÑAVERAL', 'CLARITA BOTERO', 'ARBOLEDA CAMPESTRE', 'BOQUERON PARTE ALTA', 'COLINAS DEL SUR 1',
'PROTECHO B', 'PUERTA DE ALCALA', '20 DE JULIO', 'LA CEIBITA', 'NOGALES', 'SANTA CRUZ', 'CASA BLANCA', 'CLINALTEC', 'PRADERA', 'CERRO GORDO', 'LA FLORIDA',
'PEAJE GUALANDAY', 'GALAN', 'CALAMBEO', 'CARMEN DE BULIRA', 'LIBERTADOR', 'GALARZA', 'GAVIOTA', 'TIERRA FIRME', 'TIERRA FIRME', 'ANCON TESORITO', 'MIRADOR',
 ];

  foods: Food[] = [
    { value: '≥', viewValue: '≥ ' },
    { value: '≤', viewValue: '≤' },

  ];

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  Fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy')
  constructor(private fb: FormBuilder, private service_rodamiento: RodamientoService, private service_vehiculos: VehiculoService) { }

  ngOnInit(): void {
    this.crearForm()
    this.service_vehiculos.getVehiculo().subscribe((data: any) => {
      console.log("LLEGA INFO DEL SERVICIO", data[0]);
      console.log("FECHA", data[0].rodamiento.fecha);
      console.log("FECHA DE HOY", this.Fecha);



      this.listVehiculos = data
    })

  }

  crearForm() {
    this.fromRodamiento = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      numero_rodamiento: ['', Validators.required],
      lugar: ['', Validators.required],
      numero_buseta: ['', Validators.required],
    })
  }

  createRodamiento() {
    console.log(this.fromRodamiento.value);

    const dataRodamiento = {
      "rodamiento": {
        "fecha": this.Fecha,
        "hora": this.fromRodamiento.value.hora,
        "lugar": this.fromRodamiento.value.lugar,
        "numero_ruta": this.fromRodamiento.value.numero_rodamiento,
      }

    }
    console.log("-----",dataRodamiento);
    console.log("*******",this.fromRodamiento.value.numero_buseta);
    
    this.service_rodamiento.postRodamiento(this.fromRodamiento.value).subscribe((data: any) => {
      console.log("RESPUESTA DE POST", data);
      if (data.message = true) {
        alertify.success('Rodamiento creado')
        this.service_vehiculos.putRodamiento(this.fromRodamiento.value.numero_buseta._id, dataRodamiento).subscribe((response: any) => {
          console.log("Aca llega put rodamiento", response)
          return
        })
      }
    })
  }

}
