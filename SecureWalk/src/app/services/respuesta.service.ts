import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Respuesta } from '../models/respuesta';
import { environment } from '../../environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
private listaCambio = new Subject<Respuesta[]>();
  private url = `${base_url}/respuestas`;
  constructor(private http: HttpClient) {}

  list() {
      return this.http.get<Respuesta[]>(`${this.url}/listar`);
    }
  
    insert(r: Respuesta) {
      return this.http.post(`${this.url}/insertar`, r);
    }
  
    setList(listaNueva: Respuesta[]) {
      this.listaCambio.next(listaNueva);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    listId(id: number) {
      return this.http.get<Respuesta>(`${this.url}/${id}`);
    }
  
    update(u: Respuesta) {
      return this.http.put(`${this.url}/modificar`, u);
    }
  
    deleteS(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
}
