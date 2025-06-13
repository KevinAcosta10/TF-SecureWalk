import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Encuesta } from '../models/encuesta';
import { Subject } from 'rxjs';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
private listaCambio = new Subject<Encuesta[]>()
private url = `${base_url}/encuestas`
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Encuesta[]>(`${this.url}/listar`)
  }

  insert(e: Encuesta) {
    return this.http.post(`${this.url}/insertar`, e)
  }

  setList(listaNueva: Encuesta[]) {
    this.listaCambio.next(listaNueva)
  }
  getList() {
    return this.listaCambio.asObservable()
  }
}
