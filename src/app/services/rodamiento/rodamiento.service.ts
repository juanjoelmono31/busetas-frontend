import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RodamientoModel } from 'src/app/models/rodamiento.model';
import { identifierName } from '@angular/compiler';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RodamientoService {

  WEB_URL: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getRodamiento() {
    return this.http.get(this.WEB_URL + '/rodamiento');
  }

  postRodamiento(rodamientoRegister: RodamientoModel) {
    return this.http.post(this.WEB_URL + '/rodamiento', rodamientoRegister)
  }

  getRodamientoId(id: string) {
    return this.http.get(this.WEB_URL + '/rodamiento/' + id)
  }


}
