import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Encuesta } from '../models/encuesta';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
private url = `${base_url}/encuestas/listar`
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Encuesta[]>(this.url)
  }
}
