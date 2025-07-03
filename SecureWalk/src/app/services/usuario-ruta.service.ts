import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioRuta } from '../models/usuarioRuta';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UsuarioRutaService {

  private listaCambio = new Subject<UsuarioRuta[]>();
    private url = `${base_url}/usuarioRutas`;
    constructor(private http: HttpClient) {}
  
    list() {
      return this.http.get<UsuarioRuta[]>(`${this.url}/listar`);
    }
  
    insert(r: UsuarioRuta) {
      return this.http.post(`${this.url}/insertar`, r);
    }
  
    setList(listaNueva: UsuarioRuta[]) {
      this.listaCambio.next(listaNueva);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    listId(id: number) {
      return this.http.get<UsuarioRuta>(`${this.url}/${id}`);
    }
  
    update(u: UsuarioRuta) {
      return this.http.put(`${this.url}/modificar`, u);
    }
  
    deleteS(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
  
  
}
