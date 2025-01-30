import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular'; // ✅ Importar el módulo de IonicStorage
import { PLATFORM_ID } from '@angular/core';
import { Storage } from '@ionic/storage/';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    Storage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    IonicStorageModule,
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
