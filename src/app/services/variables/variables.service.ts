import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigVariablesModel} from 'src/app/models/config-variables'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  WEB_URL: string = environment.serverUrl;


  constructor(private http: HttpClient) { }

  getVariables() {
    return this.http.get(this.WEB_URL + '/variables');
  }

  postVariables(variableRegister:ConfigVariablesModel ) {
    return this.http.post(this.WEB_URL + '/variables',ConfigVariablesModel )
  }
}
