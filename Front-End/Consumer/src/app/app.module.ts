import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { PointListPage } from "../pages/point-list/point-list";
import { PointDetailPage } from '../pages/point-detail/point-detail';
import { PointHistoryPage } from "../pages/point-history/point-history";
import { PointSendPage } from "../pages/point-send/point-send";
import { PointSpendPage } from "../pages/point-spend/point-spend";



@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    PointListPage,
    PointDetailPage,
    PointHistoryPage,
    PointSendPage,
    PointSpendPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    PointListPage,
    PointDetailPage,
    PointHistoryPage,
    PointSendPage,
    PointSpendPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
