import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Comentario } from '../models/comentario';
import { HttpClient } from '@angular/common/http';


const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
private listaCambio = new Subject<Comentario[]>();
  private url = `${base_url}/comentarios`;
  constructor(private http: HttpClient) { }

  list() {
      return this.http.get<Comentario[]>(`${this.url}/listar`);
    }
  
  insert(c: Comentario) {
      return this.http.post(`${this.url}/insertar`, c);
    }
  
  setList(listaNueva: Comentario[]) {
      this.listaCambio.next(listaNueva);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    listId(id: number) {
      return this.http.get<Comentario>(`${this.url}/${id}`);
    }
  
  update(c: Comentario) {
      return this.http.put(`${this.url}/modificar`, c);
    }
  
    deleteS(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
}
