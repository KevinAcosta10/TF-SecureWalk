import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private listaCambio = new Subject<Usuario[]>();
  private url = `${base_url}/usuarios`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuario[]>(`${this.url}/listar`);
  }

  insert(u: Usuario) {
    return this.http.post(`${this.url}/insertar`, u);
  }

  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  update(u: Usuario) {
    return this.http.put(`${this.url}/modificar`, u);
  }

  deleteS(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
