import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EvaluacionIncidente } from '../models/evaluacionincidente';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AprobacionIncidentexUsuarioDTO } from '../models/AprobacionIncidentexUsuarioDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class EvaluacionincidenteService {
  private listaCambio = new Subject<EvaluacionIncidente[]>();
  private url = `${base_url}/evaluaciones`;
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<EvaluacionIncidente[]>(`${this.url}/listar`);
  }

  insert(i: EvaluacionIncidente) {
    return this.http.post(`${this.url}/insertar`, i);
  }

  setList(listaNueva: EvaluacionIncidente[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<EvaluacionIncidente>(`${this.url}/${id}`);
  }

  update(i: EvaluacionIncidente) {
    return this.http.put(`${this.url}/modificar`, i);
  }

  deleteS(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getAprobacionIncidente():Observable<AprobacionIncidentexUsuarioDTO[]>{
    return this.http.get<AprobacionIncidentexUsuarioDTO[]>(`${this.url}/aprobacionIncidentexUsuario`);
  }
}
