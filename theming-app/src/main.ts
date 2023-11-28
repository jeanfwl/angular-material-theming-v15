import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { PLATFORM_INITIALIZER, inject } from '@angular/core';
import { ThemeManagerService } from './app/core/theme-manager.service';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [
      {
        provide: PLATFORM_INITIALIZER,
        useFactory: () => inject(ThemeManagerService).theme$,
      },
      {
        provide: MATERIAL_SANITY_CHECKS,
        useValue: {
          theme: false,
        },
      },
    ],
  })
  .catch((err) => console.error(err));
