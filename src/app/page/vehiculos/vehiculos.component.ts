import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';
import * as alertify from 'alertifyjs'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {

  formVehiculo!: FormGroup;
  hobiess = new FormArray([new FormControl('')]);
  panelOpenState = false;
  placa: any
  constructor(private service_vehiculo : VehiculoService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: {infoControl: object}) { }

  ngOnInit(): void {
    console.log(this.data.infoControl);
    this.placa = this.data.infoControl

    console.log(this.placa.placa);
    
    
    this.crearForm();
    this.service_vehiculo.getVehiculo().subscribe((data) => {
      console.log("LLEGA INFO DEL SERVICIO", data);
      
      
    })
  }

  borrarDatos(){
    
  }

  crearForm() {
    this.formVehiculo = this.fb.group({
      placa: ['', Validators.required],
      propietario: ['', Validators.required],
      modelo: ['', Validators.required],
      numero: ['', Validators.required],
     
      //conductor: ['', Validators.required],
      // poliza: ['', Validators.required],
      // rodamiento: ['', Validators.required],
      // mantenimientio: this.fb.group({
      //   fecha: [''], 
      //   descripcion: [''],
      //   valor: ['']
      // })

      mantenimiento: this.fb.array([]),
      taller: this.fb.array([]),
      estado: ['Activo'],
      pico_placa: [''],
      gastos_admin: this.fb.array([]),
      mantenimiento_taller: this.fb.array([]),

      
      
    })

  }

  get mantenimiento() {
    return this.formVehiculo.get('mantenimiento') as FormArray;
  }

  get taller() {
    return this.formVehiculo.get('taller') as FormArray;
  }

  agregarMantenimiento() {
    console.log(this.mantenimiento);

    const lessonForm = this.fb.group({
      fecha: [''],
      descripcion: [''],
      valor: [''],
    });

    this.mantenimiento.push(lessonForm);
  }

  agregar() {
    console.log(this.taller);

    const lessonForm = this.fb.group({
      fecha: [''],
      descripcion: [''],
      valor: [''],
    });

    this.taller.push(lessonForm);
  }

  createVehiculo() {
    console.log(this.formVehiculo.value);

    this.service_vehiculo.postVehiculo(this.formVehiculo.value).subscribe((data: any)=>{
      console.log("REPSUESTA DE POST", data);
      if(data.message = true){
        alertify.success('Vehiculo creado correctamente');
      }
      
    })
  }
}
