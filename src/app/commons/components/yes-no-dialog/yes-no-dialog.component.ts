import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-no-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './yes-no-dialog.component.html',
  styleUrl: './yes-no-dialog.component.scss',
})

// componente de dialogo simples com "sim" e "não" para confirmação de ações com MatDialog do angular material
export class YesNoDialogComponent {
  /* injeta os dados para o dialogo quando é aberto com uma
  propriedade "data" do tipo any para receber os dados do dialogo */
  constructor(@Inject(MAT_DIALOG_DATA) readonly data: any) { }
}
