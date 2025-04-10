import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})

// classe que customiza o paginator
export class customPaginator extends MatPaginatorIntl {
  override itemsPerPageLabel: string = 'Itens por página';
  override nextPageLabel: string = 'Próxima página';
  override previousPageLabel: string = 'Página anterior';
  override firstPageLabel: string = 'Primeira página';
  override lastPageLabel: string = 'Última página';
}
