import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Ruta } from '../models/ruta';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RutaService {
private listaCambio = new Subject<Ruta[]>();
  private url = `${base_url}/rutas`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Ruta[]>(`${this.url}/listar`);
  }

  insert(r: Ruta) {
    return this.http.post(`${this.url}/insertar`, r);
  }

  setList(listaNueva: Ruta[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Ruta>(`${this.url}/${id}`);
  }

  update(u: Ruta) {
    return this.http.put(`${this.url}/modificar`, u);
  }

  deleteS(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
