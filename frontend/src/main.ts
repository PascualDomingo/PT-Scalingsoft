import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MainComponent } from './app/components/main/main.component';

//import { AppModule } from './app/app.module';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(MainComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes)
  ]
})
  .catch((err) => console.error(err));

/*
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
*/

