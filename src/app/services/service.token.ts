import { InjectionToken } from '@angular/core';
import { ICLientService } from './api-client/clients/iclients.service';

export const SERVICES_TOKEN = {
  HTTP: {
    CLIENT: new InjectionToken<ICLientService>('SERVICES.HTTP.CLIENT'),
    // SCHEDULE: new InjectionToken<I>('SERVICES.HTTP.SCHEDULE'),
  },
};
