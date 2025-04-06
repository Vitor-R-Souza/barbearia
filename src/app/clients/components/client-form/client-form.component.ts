import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { ClientModelForm } from '../../client.models';

@Component({
  selector: 'app-client-form',
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxMaskDirective,
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss',
})

/* Este componente Angular exibe um formulário para criar ou editar informações de um cliente.
Ele utiliza componentes do Angular Material para a interface do usuário e o módulo FormsModule
para gerenciamento de formulários. Ele também utiliza a biblioteca ngx-mask para aplicar máscaras a campos de entrada. */
export class ClientFormComponent {
  @Input() // entrada de um cliente no formato ClientModelForm
  client: ClientModelForm = {
    id: 0,
    name: '',
    email: '',
    phone: '',
  }

  @Output() // emitido quando o formulario é enviado
  clientSubmited = new EventEmitter<ClientModelForm>()

  // metodo para enviar o formulario usando o evento de emit com os dados do formulario
  onSubmit(_: NgForm) {
    this.clientSubmited.emit(this.client)
  }
}
