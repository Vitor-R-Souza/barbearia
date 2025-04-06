import { Injectable } from '@angular/core';
import { ISnackbarManagerService } from './isnackbar-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/* torna o codigo um serviço no angular que pode se usado por toda a aplicação
e é injetado apenas uma vez (providedIn "root") */
@Injectable({
  providedIn: 'root',
})
/* serviço que gerencia a exibição de snackbars (notificações curtas) com MatSnackBar do angular material */
export class SnackbarManagerService implements ISnackbarManagerService {
  /* injeta o MatSnackBar do angular material para que o serviço possa usar ele
  e não seja alterada fora do construtor (read only)*/
  constructor(private readonly snackBar: MatSnackBar) { }

  /* metodo void (retorna nada) que exibe o snackBar com mensagem,
  conteudo do botão de ação que por padrão é "fechar",
  duração do snackBar que por padrão é 3000 milisegundos (3 segundos) */
  show(
    message: string,
    action: string = 'fechar',
    duration: number = 3000
  ): void {
    this.snackBar.open(message, action, { duration, verticalPosition: 'top', horizontalPosition: 'right', })
    /*usa a função do MatSnackBar para exibir o snack bar na parte superior direita da tela usando os dados fornecidos*/
  }
}
