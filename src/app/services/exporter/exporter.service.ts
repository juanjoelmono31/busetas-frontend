import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const Excel_Type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF- ';
const Excel_Ext = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExporterService {

  constructor() { }

  exportToExcel(json:any[], excelFileName: string): void{
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const worbook: XLSX.WorkBook = { Sheets: { 'data': worksheet},
    SheetNames: ['data']
    }
    const excelBuffer: any = XLSX.write(worbook, { bookType: 'xlsx',  type: 'array'});
    //Llamamos el metodo de guardar
    this.saveAsExcel(excelBuffer, excelFileName)
    
  }

  private saveAsExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: Excel_Type});
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + Excel_Ext )
  }
}
