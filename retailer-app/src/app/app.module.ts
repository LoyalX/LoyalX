import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { RetailerApp } from './app.component';

import { UserData } from '../providers/user-data';
import { LoyalXProvider } from '../providers/loyalx';
//import { UportProvider } from '../providers/uport';
import { SocketIoService } from '../providers/socketIo';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { RulesCreatePage } from '../pages/rules-create/rules-create';
import { OffersPage } from '../pages/offers/offers'

import { OfferCreatePage } from '../pages/offer-create/offer-create';
import { OfferCreatePageModule } from '../pages/offer-create/offer-create.module';

import { FeatureModalPage } from '../pages/feature-modal/feature-modal';
import { FeatureModalPageModule } from '../pages/feature-modal/feature-modal.module';

import { ErrorPage } from '../pages/error/error';
import { ErrorPageModule } from '../pages/error/error.module';

import { OnBoardPage } from '../pages/on-board/on-board';
import { OnBoardPageModule } from '../pages/on-board/on-board.module';

import { RulesEnginePage } from '../pages/rules-engine/rules-engine';
import { RulesEnginePageModule } from '../pages/rules-engine/rules-engine.module';

import { ProfilePage } from '../pages/profile/profile';
import { ProfilePageModule } from '../pages/profile/profile.module';

import { PointTransferPage } from '../pages/point-transfer/point-transfer';
import { PointTransferPageModule } from '../pages/point-transfer/point-transfer.module';

import { TransactionsPage } from '../pages/transactions/transactions';
import { TransactionsPageModule } from '../pages/transactions/transactions.module';

import { FeaturesPage } from '../pages/features/features';
import { FeaturesPageModule } from '../pages/features/features.module';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';

@NgModule({
  declarations: [
    RetailerApp,
    LoginPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    OffersPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    OnBoardPageModule,
    OfferCreatePageModule,
    FeatureModalPageModule,
    PointTransferPageModule,
    RulesEnginePageModule,
    ErrorPageModule,
    ProfilePageModule,
    TransactionsPageModule,
    FeaturesPageModule,
    IonicModule.forRoot(RetailerApp, {}, {
      links: [
        { component: FeaturesPage, name: 'FeaturesPage', segment: 'features' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: ErrorPage, name: 'ErrorPage', segment: 'error' },
        { component: OnBoardPage, name: 'OnBoardPage', segment: 'onBoard' },
        { component: RulesEnginePage, name: 'RulesEnginePage', segment: 'rulesEngine' },
        { component: OffersPage, name: 'OffersPage', segment: 'offers' },
        { component: PointTransferPage, name: 'PointTransferPage', segment: 'pointTransfer' },
        { component: ProfilePage, name: 'ProfilePage', segment: 'profile' },
        { component: TransactionsPage, name: 'TransactionsPage', segment: 'transactions' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    RetailerApp,
    LoginPage,
    SignupPage,
    ErrorPage,
    TabsPage,
    TutorialPage,
    OffersPage,
    FeatureModalPage,
    OfferCreatePage,
    PointTransferPage,
    OnBoardPage,
    RulesEnginePage,
    TransactionsPage,
    RulesCreatePage,
    ProfileEditPage
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
