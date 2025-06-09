import { Injectable } from '@angular/core';
import { Pregunta } from '../models/pregunta';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private url = `${base_url}/preguntas/listar`
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Pregunta[]>(this.url)
  }
}
