import { bootstrapApplication } from '@angular/platform-browser';
//import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { MainComponent } from './app/components/main/main.component';

const bootstrap = () => bootstrapApplication(MainComponent, config);

export default bootstrap;
