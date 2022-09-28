import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ]

  monthSelect!: any[];
  dateSelect: any

  constructor() { }

  ngOnInit(): void {
    this.getDaysFromDate(11,2020)
  }

  getDaysFromDate(month: any, year: any) {
    const startDate = moment(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true)

    const numberDays = Math.round(diffDays)

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`)

      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      }
    });

    this.monthSelect = arrayDays
  }

  changeMonth(flag: any) {
    if (flag < 0) {
      const nextDate = this.dateSelect.clone().subtract(1, "month")
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"))
    } else {
      const nextDate = this.dateSelect.colne().add(1, "month")
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"))
    }
  }

  

}
