import { IPets } from '../../screen/Home';
import {ISettings} from '../../screen/FilterSettings';

export type LoggedOutStackType = {
  LOGIN_PAGE: undefined;
  REGISTRATION_PAGE: undefined;
};
export type DrawerStackType = {
  TAB_BAR_STACK: undefined;
};
export type LoggedInStackType = {
  DRAWER_STACK: {
    screen?: keyof TabBarStackType;
    params?: TabBarStackType[keyof TabBarStackType];
  };
  FILTERS_SETTINGS_PAGE: {
    petsList: IPets[];
  };
  PET_PAGE: {
    pets: IPets;
  }
};
export type TabBarStackType = {
  HOME_PAGE: {
    settings: ISettings;
  };
  FAVORITE_PAGE: undefined;
};

const LoggedOutStackScreens: LoggedOutStackType = {
  LOGIN_PAGE: undefined,
  REGISTRATION_PAGE: undefined,
};
const LoggedInStackScreens: DrawerStackType = {
  TAB_BAR_STACK: undefined,
};
export type RootStackNavigation = {
  LOGGED_IN_STACK: {screens?: keyof typeof LoggedInStackScreens};
  LOGGED_OUT_STACK: {screens?: keyof typeof LoggedOutStackScreens};
};