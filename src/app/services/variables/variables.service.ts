import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigVariablesModel} from 'src/app/models/config-variables'

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  constructor(private http: HttpClient) { }

  getVariables() {
    return this.http.get('http://54.164.205.82:3000/variables');
  }

  postVariables(variableRegister:ConfigVariablesModel ) {
    return this.http.post('http://54.164.205.82:3000/variables',ConfigVariablesModel )
  }
}
