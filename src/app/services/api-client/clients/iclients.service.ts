import { Observable } from 'rxjs';
import {
  DetailClientResponse,
  ListClientResponse,
  SaveClientRequest,
  SaveClientResponse,
  UpdateClientRequest,
  UpdateClientResponse,
} from './client.models';

/* definição de uma interface que serve de contrato para os serviços do cliente,
garantido que esses metodos sejam aplicados em outras classes */
export interface ICLientService {
  save(request: SaveClientRequest): Observable<SaveClientResponse>

  update(id: number, request: UpdateClientRequest): Observable<UpdateClientResponse>

  delete(id: number): Observable<void>

  list(): Observable<ListClientResponse[]>

  findById(id: number): Observable<DetailClientResponse>
}
