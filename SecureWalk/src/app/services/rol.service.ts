import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Rol } from '../models/rol';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class RolService {
  private listaCambio = new Subject<Rol[]>();
  private url = `${base_url}/roles`;
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Rol[]>(`${this.url}/listar`);
  }

  insert(r: Rol) {
    return this.http.post(`${this.url}/insertar`, r);
  }

  setList(listaNueva: Rol[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Rol>(`${this.url}/${id}`);
  }

  update(r: Rol) {
    return this.http.put(`${this.url}/modificar`, r);
  }

  deleteS(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
