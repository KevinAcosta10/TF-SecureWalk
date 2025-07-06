import { Injectable } from '@angular/core';
import { Respuesta } from '../models/respuesta';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaxNombreEncuestaDTO } from '../models/RespuestaxNombreEncuestaDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  private listaCambio = new Subject<Respuesta[]>();
    private url = `${base_url}/respuestas`;
    constructor(private http: HttpClient) { }
    list() {
      return this.http.get<Respuesta[]>(`${this.url}/listar`);
    }
  
    insert(p: Respuesta) {
      return this.http.post(`${this.url}/insertar`, p);
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
  
    update(p: Respuesta) {
      return this.http.put(`${this.url}/modificar`, p);
    }
  
    deleteS(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }

    getRespuestaxNombreEncuesta():Observable<RespuestaxNombreEncuestaDTO[]>{
      return this.http.get<RespuestaxNombreEncuestaDTO[]>(`${this.url}/respuestaxNombreEncuesta`);
    }
}
