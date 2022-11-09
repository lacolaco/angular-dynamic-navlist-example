import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserService } from './user.service';
import { NavList, NavListItemData } from './nav-list/nav-list';
import { PublicPageComponent } from './public-page/public-page.component';
import { UserPageComponent } from './user-page/user-page.component';

export const routes: Route[] = [
  {
    path: 'public',
    component: PublicPageComponent,
    data: {
      navList: {
        label: 'Public',
      } as NavListItemData,
    },
  },
  {
    path: 'user',
    component: UserPageComponent,
    canMatch: [(route) => inject(NavList).canNavigate(route)],
    data: {
      navList: {
        label: 'User Only',
        canNavigate: () => inject(UserService).isLoggedIn(),
      } as NavListItemData,
    },
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canMatch: [(route) => inject(NavList).canNavigate(route)],
    data: {
      navList: {
        label: 'Admin Only',
        canNavigate: () => inject(UserService).isLoggedInAsAdmin(),
      } as NavListItemData,
    },
  },
];
