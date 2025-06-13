import { Injectable } from '@angular/core';
import { Pregunta } from '../models/pregunta';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private listaCambio = new Subject<Pregunta[]>()
  private url = `${base_url}/preguntas`
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Pregunta[]>(`${this.url}/listar`)
  }

  insert(p: Pregunta) {
        return this.http.post(`${this.url}/insertar`, p)
      }
    
      setList(listaNueva: Pregunta[]) {
        this.listaCambio.next(listaNueva)
      }
      getList() {
        return this.listaCambio.asObservable()
      }
}
