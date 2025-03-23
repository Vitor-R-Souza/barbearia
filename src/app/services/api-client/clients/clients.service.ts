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

@Injectable({
  providedIn: 'root',
})
export class ClientsService implements ICLientService {
  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: SaveClientRequest): Observable<SaveClientResponse> {
    return this.http.post<SaveClientResponse>(
      `${this.basePath}client`,
      request
    );
  }

  update(
    id: number,
    request: UpdateClientRequest
  ): Observable<UpdateClientResponse> {
    return this.http.put<UpdateClientResponse>(
      `${this.basePath}client/${id}`,
      request
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}client/${id}`);
  }

  list(): Observable<ListClientResponse[]> {
    return this.http.get<ListClientResponse[]>(`${this.basePath}client`);
  }

  findById(id: number): Observable<DetailClientResponse> {
    return this.http.get<DetailClientResponse>(`${this.basePath}client/${id}`);
  }
}
