import { InjectionToken } from '@angular/core';
import { ICLientService } from './api-client/clients/iclients.service';
import { ISnackbarManagerService } from './isnackbar-manager.service';
import { IDialogManagerService } from './idialog-manager.service';
import { ISchdeuleService } from './api-client/schedules/ISchedule.service';

export const SERVICES_TOKEN = {
  HTTP: {
    CLIENT: new InjectionToken<ICLientService>('SERVICES.HTTP.CLIENT'),
    SCHEDULE: new InjectionToken<ISchdeuleService>('SERVICES.HTTP.SCHEDULE'),
  },
  SNACKBAR: new InjectionToken<ISnackbarManagerService>(
    'SERVICES_TOKEN.SNACKBAR'
  ),
  DIALOG: new InjectionToken<IDialogManagerService>('SERVICES_TOKEN.DIALOG'),
};
