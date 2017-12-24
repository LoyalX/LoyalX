import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { OnBoardPageModule } from '../pages/on-board/on-board.module';
import { BrandDetailPageModule } from '../pages/brand-detail/brand-detail.module';
import { OfferCreatePageModule } from '../pages/offer-create/offer-create.module';
import { ErrorPageModule } from '../pages/error/error.module';

import { ConferenceApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { ErrorPage } from '../pages/error/error';
import { TokenListPage } from '../pages/token-list/token-list';
import { PointListPage } from '../pages/point-list/point-list'
import { PointTransferPageModule } from '../pages/point-transfer/point-transfer.module';
import { TokenListPageModule } from '../pages/token-list/token-list.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { OnBoardPage } from '../pages/on-board/on-board';
import { BrandDetailPage } from '../pages/brand-detail/brand-detail';
import { OfferCreatePage } from '../pages/offer-create/offer-create';
import { PointTransferPage } from '../pages/point-transfer/point-transfer';
import { ProfilePage } from '../pages/profile/profile';

import { UserData } from '../providers/user-data';
import { LoyalXProvider } from '../providers/loyalx';
import { SocketIoService } from '../providers/socketIo';
//import { UportProvider } from '../providers/uport/uport';


@NgModule({
  declarations: [
    ConferenceApp,
    LoginPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    PointListPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    OnBoardPageModule,
    BrandDetailPageModule,
    OfferCreatePageModule,
    PointTransferPageModule,
    TokenListPageModule,
    ErrorPageModule,
    ProfilePageModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: ErrorPage, name: 'ErrorPage', segment: 'error' },
        { component: OnBoardPage, name: 'OnBoardPage', segment: 'onBoard' },
        { component: TokenListPage, name: 'TokenListPage', segment: 'tokenList' },
        { component: PointListPage, name: 'PointListPage', segment: 'pointList/:tokenIndex' },
        { component: PointTransferPage, name: 'PointTransferPage', segment: 'pointTransfer/:tokenIndex' },
        { component: ProfilePage, name: 'ProfilePage', segment: 'profile' }

      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    LoginPage,
    SignupPage,
    ErrorPage,
    TabsPage,
    TutorialPage,
    PointListPage,
    OfferCreatePage,
    PointTransferPage,
    OnBoardPage,
    TokenListPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserData,
    InAppBrowser,
    SplashScreen,
    LoyalXProvider,
    SocketIoService,
    // UportProvider
  ]
})
export class AppModule { }
