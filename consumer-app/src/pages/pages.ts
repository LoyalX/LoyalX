import { TabsPage } from './tabs/tabs';

import { PointListPage } from "./point-list/point-list";

// The page the user lands on after opening the app and without a session
export const FirstRunPage = PointListPage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = TabsPage;

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = PointListPage;
export const Tab2Root = PointListPage;
export const Tab3Root = PointListPage;
