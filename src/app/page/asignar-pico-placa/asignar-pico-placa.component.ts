import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as alertify from 'alertifyjs'
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';

@Component({
  selector: 'app-asignar-pico-placa',
  templateUrl: './asignar-pico-placa.component.html',
  styleUrls: ['./asignar-pico-placa.component.scss']
})
export class AsignarPicoPlacaComponent implements OnInit {
  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];

  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  fromPicoPlaca!: FormGroup

  monthSelect!: any[];
  dateSelect: any;
  dateValue: any;
  pipe = new DatePipe('en-US');
  Fecha: any;
  Hoy: any
  listVehiculos: any = [];
  listaFechaPyP: any = [];

  constructor(private fb: FormBuilder, private service_vehiculos: VehiculoService) { }

  ngOnInit(): void {
    this.Hoy = new Date
    this.Fecha = this.pipe.transform(this.Hoy, 'MM/dd/yyyy')
    this.crearForm()
    this.service_vehiculos.getVehiculo().subscribe((data: any) => {
      console.log('INFO DEL SERVICIO', data);
      this.listVehiculos = data
    })
    this.getDaysFromDate((this.Hoy.getMonth() + 1), this.Hoy.getFullYear())
  }

  crearForm() {
    this.fromPicoPlaca = this.fb.group({
      fecha: ['', Validators.required],
      estado: ['', Validators.required],
      placas: ['', Validators.required]
    })
  }



  getDaysFromDate(month: any, year: any) {

    const startDate = moment(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday(),
      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag: any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day: any) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;
    const FechaSelect = this.pipe.transform(this.dateValue, 'MM/dd/yyyy')
    this.fromPicoPlaca.value.fecha = FechaSelect;
    console.log('HOY', this.Fecha);
    console.log('Fecha select', FechaSelect);


  }

  asignarFecha(fecha: any) {
    const dataPicoPlaca = this.pipe.transform(fecha, 'MM/dd/yyyy')
    this.listaFechaPyP.push(dataPicoPlaca)
    alertify.success('Fecha asignada correctamente')
  }

  createPicoPlaca() {
    console.log(this.toppings.value);
    const placas = this.toppings.value

    const dataPicoPlaca = {
      "pico_placa": {
        "fecha": this.listaFechaPyP
      },
      // "estado": this.fromPicoPlaca.value.estado
    }

    console.log("datos formulario", dataPicoPlaca);
    console.log("Placas para actualziar", placas);

    for (let index = 0; index < placas.length; index++) {
      const id_vehiculo = placas[index];

      this.service_vehiculos.putPicoPlaca(id_vehiculo, dataPicoPlaca).subscribe((data: any) => {
        console.log("SE ACTUALIZO CON EXITO", data);
        alertify.success(`Asignacion de pico y placa relizada ${data.updatedPico_placaYestado.placa}`);

      })

    }

  }
}
