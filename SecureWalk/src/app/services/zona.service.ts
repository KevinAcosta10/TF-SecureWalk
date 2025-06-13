import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Zona } from '../models/zona';
import { Subject } from 'rxjs';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ZonaService {
  private listaCambio = new Subject<Zona[]>()
  private url = `${base_url}/zonas`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Zona[]>(`${this.url}/listar`)
  }
  insert(z: Zona) {
        return this.http.post(`${this.url}/insertar`, z)
      }
    
      setList(listaNueva: Zona[]) {
        this.listaCambio.next(listaNueva)
      }
      getList() {
        return this.listaCambio.asObservable()
      }
}
