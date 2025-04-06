import { Injectable } from '@angular/core';
import { ICLientService } from './iclients.service';
import { Observable } from 'rxjs';
import {
  SaveClientRequest,
  SaveClientResponse,
  UpdateClientRequest,
  UpdateClientResponse,
  ListClientResponse,
  DetailClientResponse,
} from './client.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

/* torna o codigo um serviço no angular que pode se usado por toda a aplicação
e é injetado apenas uma vez (providedIn "root") */
@Injectable({
  providedIn: 'root',
})

/* classe de serviço para uma API para gerenciar os serviços da parte de cliente (CRUD),
usando o HttpClient do angular e metodos da interface ICLientService */
export class ClientsService implements ICLientService {
  // variavel privada com a URL base da API
  private readonly basePath = environment.apiUrl

  // injeção do HttpClient para chamadas HTTP
  constructor(private http: HttpClient) { }

  // salva um cliente
  save(request: SaveClientRequest): Observable<SaveClientResponse> {
    return this.http.post<SaveClientResponse>(`${this.basePath}client`, request)
  }

  // atualiza os dados de um cliente usando o ID para a busca
  update(id: number, request: UpdateClientRequest): Observable<UpdateClientResponse> {
    return this.http.put<UpdateClientResponse>(`${this.basePath}client/${id}`, request)
  }

  // deleta um cliente pelo ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}client/${id}`);
  }

  // lista todos os clientes
  list(): Observable<ListClientResponse[]> {
    return this.http.get<ListClientResponse[]>(`${this.basePath}client`);
  }

  // busca os dados de um cliente pelo ID
  findById(id: number): Observable<DetailClientResponse> {
    return this.http.get<DetailClientResponse>(`${this.basePath}client/${id}`);
  }
}
