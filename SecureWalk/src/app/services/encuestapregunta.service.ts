import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EncuestaPregunta } from '../models/encuestapregunta';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class EncuestapreguntaService {
private listaCambio = new Subject<EncuestaPregunta[]>();
  private url = `${base_url}/encuestasPreguntas`;
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<EncuestaPregunta[]>(`${this.url}/listar`);
  }

  insert(i: EncuestaPregunta) {
    return this.http.post(`${this.url}/insertar`, i);
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

  update(i: EncuestaPregunta) {
    return this.http.put(`${this.url}/modificar`, i);
  }

  deleteS(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }


  listByEncuesta(id: number): Observable<EncuestaPregunta[]> {
    return this.http.get<EncuestaPregunta[]>(`${this.url}/por-encuesta/${id}`);
  }
}
