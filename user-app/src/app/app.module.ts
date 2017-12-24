import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QRScanner } from '@ionic-native/qr-scanner';

import { IonicStorageModule } from '@ionic/storage';

import { AddressCodePageModule } from '../pages/address-code/address-code.module';
import { ErrorPageModule } from '../pages/error/error.module';
import { PointTransferPageModule } from '../pages/point-transfer/point-transfer.module';
import { TokenListPageModule } from '../pages/token-list/token-list.module';

import { ConferenceApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { TokenListPage } from '../pages/token-list/token-list';
import { PointListPage } from '../pages/point-list/point-list';
import { OfferCreatePage } from '../pages/offer-create/offer-create';
import { PointTransferPage } from '../pages/point-transfer/point-transfer';
import { AddressCodePage } from '../pages/address-code/address-code';

import { UserData } from '../providers/user-data';
import { Web3Provider } from '../providers/web3/web3';

import { LoyaltyTokenProvider } from '../providers/loyalty-token/loyalty-token';
import { LoyaltyFactoryProvider } from '../providers/loyalty-factory/loyalty-factory';
import { ErrorPage } from "../pages/error/error";
import { UportProvider } from '../providers/uport/uport';


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
		AddressCodePageModule,
		TokenListPageModule,
		PointTransferPageModule,
		ErrorPageModule,
		IonicModule.forRoot(ConferenceApp, {}, {
			links: [
				{ component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
				{ component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
				{ component: LoginPage, name: 'LoginPage', segment: 'login' },
				{ component: SignupPage, name: 'SignupPage', segment: 'signup' },
				{ component: ErrorPage, name: 'ErrorPage', segment: 'error' },
				{ component: AddressCodePage, name: 'AddressCodePage', segment: 'addressCode' },
				{ component: TokenListPage, name: 'TokenListPage', segment: 'tokenList' },
				{ component: PointListPage, name: 'PointListPage', segment: 'pointList/:tokenIndex' },
				{ component: PointTransferPage, name: 'PointTransferPage', segment: 'pointTransfer/:tokenIndex' }

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
		TokenListPage,
		AddressCodePage
	],
	providers: [
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		UserData,
		InAppBrowser,
		SplashScreen,
		Web3Provider,
		LoyaltyTokenProvider,
		LoyaltyFactoryProvider,
    UportProvider
	]
})
export class AppModule { }
