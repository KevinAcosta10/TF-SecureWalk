import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private listaCambio = new Subject<Post[]>();
  private url = `${base_url}/posts`;
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Post[]>(`${this.url}/listar`);
  }

  insert(p: Post) {
    return this.http.post(`${this.url}/insertar`, p);
  }

  setList(listaNueva: Post[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Post>(`${this.url}/${id}`);
  }

  update(p: Post) {
    return this.http.put(`${this.url}/modificar`, p);
  }

  deleteS(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
