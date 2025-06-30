import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Incidente } from '../models/incidente';
import { HttpClient } from '@angular/common/http';
import { IncidentePorUsuarioDTO } from '../models/incidentesPorUsuarioDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class IncidenteService {
  private listaCambio = new Subject<Incidente[]>();
  private url = `${base_url}/incidentes`;
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Incidente[]>(`${this.url}/listar`);
  }

  insert(i: Incidente) {
    return this.http.post(`${this.url}/insertar`, i);
  }

  setList(listaNueva: Incidente[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Incidente>(`${this.url}/${id}`);
  }

  update(i: Incidente) {
    return this.http.put(`${this.url}/modificar`, i);
  }

  deleteS(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getQuantity(): Observable<IncidentePorUsuarioDTO[]> {
    return this.http.get<IncidentePorUsuarioDTO[]>(`${this.url}/incidentesPorUsuario`)

  }
}
