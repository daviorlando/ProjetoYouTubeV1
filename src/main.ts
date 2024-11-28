import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideAuth0 } from '@auth0/auth0-angular';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
