import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Encuesta } from '../models/encuesta';
import { Observable, Subject } from 'rxjs';
import { EncuestaConPreguntasDTO } from '../models/encuestaconpreguntasDTO';
import { nombreEncuestaxUsuarioDTO } from '../models/nombreEncuestaxUsuarioDTO';

const base_url = environment.base
const ENCUESTAS_PREGUNTAS_BASE_URL = `${base_url}/encuestasPreguntas`; // URL para operaciones de EncuestaPregunta

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
  listId(id: number) {
      return this.http.get<Encuesta>(`${this.url}/${id}`);
    }
  
    update(e: Encuesta) {
      return this.http.put(`${this.url}/modificar`, e);
    }
  
    deleteS(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
     listarEncuestasConPreguntasAgrupadas(): Observable<EncuestaConPreguntasDTO[]> {
    return this.http.get<EncuestaConPreguntasDTO[]>(`${ENCUESTAS_PREGUNTAS_BASE_URL}/agrupadas`);
  }

  getNombreEncuestaxUsuario():Observable<nombreEncuestaxUsuarioDTO[]>{
    return this.http.get<nombreEncuestaxUsuarioDTO[]>(`${this.url}/nombreEncuestaxUsuario`);
  }
}
