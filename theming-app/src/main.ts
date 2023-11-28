import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { PLATFORM_INITIALIZER, inject } from '@angular/core';
import { ThemeManagerService } from './app/core/theme-manager.service';

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [
      {
        provide: PLATFORM_INITIALIZER,
        useFactory: () => inject(ThemeManagerService).theme$,
      },
    ],
  })
  .catch((err) => console.error(err));
