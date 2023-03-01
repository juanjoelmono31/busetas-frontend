import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigVariablesModel} from 'src/app/models/config-variables'

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  constructor(private http: HttpClient) { }

  getVariables() {
    return this.http.get('http://localhost:3000/variables');
  }

  postVariables(variableRegister:ConfigVariablesModel ) {
    return this.http.post('http://localhost:3000/variables',ConfigVariablesModel )
  }
}
