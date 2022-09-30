import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import { ConductorComponent } from '../conductor/conductor.component';

@Component({
  selector: 'app-list-coductores',
  templateUrl: './list-coductores.component.html',
  styleUrls: ['./list-coductores.component.scss']
})
export class ListCoductoresComponent implements OnInit {

  listConductores: any = []

  constructor(private service_conductor: ConductorService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.service_conductor.getCoductor().subscribe((data )=>{
      console.log("LLEGA INFO DEL SERVICIO", data);
      this.listConductores = data;
      
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConductorComponent, {
      height: '450px',
      width: '500px'
    }
      );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
