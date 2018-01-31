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

import { RulesCreatePageModule } from '../pages/rules-create/rules-create.module';

import { OffersPage } from '../pages/offers/offers'

import { OfferCreatePageModule } from '../pages/offer-create/offer-create.module';

import { BadgeCreatePageModule } from '../pages/badge-create/badge-create.module';

import { BadgeIssuePage } from '../pages/badge-issue/badge-issue';
import { BadgeIssuePageModule } from '../pages/badge-issue/badge-issue.module'

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

import { BadgeModalPage } from '../pages/badge-modal/badge-modal';
import { BadgeModalPageModule } from '../pages/badge-modal/badge-modal.module';

import { BadgeListPage } from '../pages/badge-list/badge-list';
import { BadgeListPageModule } from '../pages/badge-list/badge-list.module';

import { FeaturesPage } from '../pages/features/features';
import { FeaturesPageModule } from '../pages/features/features.module';

import { ProfileEditPageModule } from '../pages/profile-edit/profile-edit.module';

import { PopoverBadgeActionPage } from '../pages/badge-list/badge-list';

@NgModule({
  declarations: [
    RetailerApp,
    LoginPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    OffersPage,
    PopoverBadgeActionPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    OnBoardPageModule,
    OfferCreatePageModule,
    BadgeCreatePageModule,
    BadgeIssuePageModule,
    RulesCreatePageModule,
    ProfileEditPageModule,
    FeatureModalPageModule,
    PointTransferPageModule,
    RulesEnginePageModule,
    ErrorPageModule,
    ProfilePageModule,
    TransactionsPageModule,
    BadgeModalPageModule,
    BadgeListPageModule,
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
        { component: TransactionsPage, name: 'TransactionsPage', segment: 'transactions' },
        { component: BadgeListPage, name: 'BadgeListPage', segment: 'badges' }
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
    PointTransferPage,
    OnBoardPage,
    RulesEnginePage,
    TransactionsPage,
    PopoverBadgeActionPage
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
