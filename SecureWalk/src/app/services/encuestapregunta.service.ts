import { Injectable } from '@angular/core';
import { EncuestaPregunta } from '../models/encuestapregunta';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class EncuestapreguntaService {
private listaCambio = new Subject<EncuestaPregunta[]>();
  private url = `${base_url}/encuestasPreguntas`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<EncuestaPregunta[]>(`${this.url}/listar`);
  }

  insert(r: EncuestaPregunta) {
    return this.http.post(`${this.url}/insertar`, r);
  }

  setList(listaNueva: EncuestaPregunta[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<EncuestaPregunta>(`${this.url}/${id}`);
  }

  update(u: EncuestaPregunta) {
      return this.http.put(`${this.url}/modificar`, u);
    }
  
    deleteS(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }

}
