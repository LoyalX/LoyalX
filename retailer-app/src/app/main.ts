import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';
import CONFIG from '../config';

if (CONFIG.IS_PRODUCTION) { enableProdMode(); }
platformBrowserDynamic().bootstrapModule(AppModule);
