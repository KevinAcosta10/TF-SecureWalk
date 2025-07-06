import { Injectable } from '@angular/core';
import { UsuarioRuta } from '../models/usuarioruta';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { zonaxUsuarioDTO } from '../models/zonaxUsuarioDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UsuariorutaService {
  private listaCambio = new Subject<UsuarioRuta[]>();
    private url = `${base_url}/usuarioRutas`;
    constructor(private http: HttpClient) {}
  
    list() {
      return this.http.get<UsuarioRuta[]>(`${this.url}/listar`);
    }
  
    insert(ur: UsuarioRuta) {
      return this.http.post(`${this.url}/insertar`, ur);
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
  
    update(ur: UsuarioRuta) {
      return this.http.put(`${this.url}/modificar`, ur);
    }
  
    deleteS(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }

    getZonaxUsuario():Observable<zonaxUsuarioDTO[]>{
      return this.http.get<zonaxUsuarioDTO[]>(`${this.url}/zonaxUsuario`);
    }
}
