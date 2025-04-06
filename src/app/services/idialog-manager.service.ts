import { ComponentType } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { YesNoDialogComponent } from '../commons/components/yes-no-dialog/yes-no-dialog.component';

/* interface base que garanto que o DialogManagerService use os metodos criados aqui */
export interface IDialogManagerService {
  showYesNoDialog(
    component: ComponentType<YesNoDialogComponent>,
    data: { title: string; content: string }
  ): Observable<any>
}
