import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VariablesService } from 'src/app/services/variables/variables.service';
import * as alertify from 'alertifyjs'

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-config-variables',
  templateUrl: './config-variables.component.html',
  styleUrls: ['./config-variables.component.scss']
})
export class ConfigVariablesComponent implements OnInit {
  formVariables!: FormGroup
  selectedValue!: string;

  foods: Food[] = [
    {value: '≥', viewValue: '≥ '},
    {value: ' ≤', viewValue: ' ≤'},
 
  ];

  constructor(private fb: FormBuilder, private service_variables: VariablesService ) { }

  ngOnInit(): void {
    this. crearForm()
  }


  crearForm() {
    this.formVariables = this.fb.group({
      valor_pasaje: ['', Validators.required],
      valor_porcentaje_conductor: ['', Validators.required],
      valor_liq_conductor: ['', Validators.required],
      bonificacion: ['', Validators.required],
    })
  }

  createConductor(){
    console.log(this.formVariables.value);

    this.service_variables.postVariables(this.formVariables.value).subscribe((data: any)=>{
      console.log("REPSUESTA DE POST", data);
      if(data.message = true){
        alertify.success('Variable creada correctamente');
      }
      
    })
    

  }
}
