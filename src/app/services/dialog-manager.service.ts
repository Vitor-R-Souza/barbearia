import { Injectable } from '@angular/core';
import { IDialogManagerService } from './idialog-manager.service';
import { ComponentType } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { YesNoDialogComponent } from '../commons/components/yes-no-dialog/yes-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';

/* torna o codigo um serviço no angular que pode se usado por toda a aplicação
e é injetado apenas uma vez (providedIn "root") */
@Injectable({
  providedIn: 'root',
})

/* Serviço criado para gerenciar e mostrar telas de dialogo (especificamente "sim ou não")
para gerenciar situações d confirmação de alguma ação */
export class DialogManagerService implements IDialogManagerService {
  /* injeta o mat dialog do angular material para que o serviço possa usar ele
  e não seja alterada fora do construtor (read only)*/
  constructor(private readonly dialog: MatDialog) { }

  /* metodo responsavel pelo dialogo "sim ou não" recebendo o componente YesNoDialog
  e um objeto data com um titulo e conteudo, voltando um Observable */
  showYesNoDialog(
    component: ComponentType<YesNoDialogComponent>,
    data: { title: string; content: string }
  ): Observable<any> {
    /* abre o dialogo configurando com o componente e os dados */
    const dialogRef = this.dialog.open(component, { width: '400', data, })
    return dialogRef.afterClosed() // emite o resultado em um Observable ou undefined quando é fechado sem valor
  }
}
