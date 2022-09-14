import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {

  formVehiculo!: FormGroup;
  hobiess = new FormArray([new FormControl('')]);
  panelOpenState = false;

  constructor(private service_vehiculo : VehiculoService, private fb: FormBuilder) { }

  ngOnInit(): void {
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
      //conductor: ['', Validators.required],
      poliza: ['', Validators.required],
      rodamiento: ['', Validators.required],
      numero: ['', Validators.required],
      // mantenimientio: this.fb.group({
      //   fecha: [''], 
      //   descripcion: [''],
      //   valor: ['']
      // })

      mantenimiento: this.fb.array([]),
      taller: this.fb.array([]),
      
      
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
