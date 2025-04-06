import { InjectionToken } from '@angular/core';
import { ICLientService } from './api-client/clients/iclients.service';
import { ISnackbarManagerService } from './isnackbar-manager.service';
import { IDialogManagerService } from './idialog-manager.service';
import { ISchdeuleService } from './api-client/schedules/ischedule.service';

/* objeto SERVICES_TOKEN que contem InjectionsTokens para os serviços da aplicação.
InjectionTokens são usados no Angular para fornecer dependências de forma mais flexível e segura,
especialmente quando se lida com interfaces ou valores que não são classes.
Assim podemos com maior facilidade injetar cada interface de cada serviço feito na aplicação*/
export const SERVICES_TOKEN = {
  HTTP: {
    CLIENT: new InjectionToken<ICLientService>('SERVICES_TOKEN.HTTP.CLIENT'),
    SCHEDULE: new InjectionToken<ISchdeuleService>('SERVICES_TOKEN.HTTP.SCHEDULE'),
  },
  SNACKBAR: new InjectionToken<ISnackbarManagerService>('SERVICES_TOKEN.SNACKBAR'),
  DIALOG: new InjectionToken<IDialogManagerService>('SERVICES_TOKEN.DIALOG'),
}
