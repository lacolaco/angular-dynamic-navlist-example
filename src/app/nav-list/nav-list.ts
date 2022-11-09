import { EnvironmentInjector, inject, Injectable } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { combineLatest, map, Observable, of } from 'rxjs';

// For Route.data.navList
export type NavListItemData = {
  label: string;
  canNavigate?: () => Observable<boolean>;
};

export type NavListItem = Route & {
  canNavigate: boolean;
  navListItem: NavListItemData;
};

function hasNavListItemData(
  route: Route
): route is Route & { data: { navList: NavListItemData } } {
  return route.data && route.data['navList'];
}

@Injectable({ providedIn: 'root' })
export class NavList {
  private envInjector = inject(EnvironmentInjector);

  fromRoutes(routes: Routes): Observable<NavListItem[]> {
    const routesWithNavListData = routes
      .filter(hasNavListItemData)
      .map((route) => ({
        ...route,
        navListItem: route.data.navList,
      }));

    return combineLatest(
      routesWithNavListData.map((route) => {
        return this.canNavigate(route).pipe(
          map((canNavigate) => ({ ...route, canNavigate }))
        );
      })
    ).pipe(map((items) => items.filter((item) => item.canNavigate)));
  }

  canNavigate(route: Route): Observable<boolean> {
    if (hasNavListItemData(route)) {
      const { canNavigate } = route.data.navList;
      if (canNavigate) {
        // Support `inject()` in `canNavigate` function
        return this.envInjector.runInContext(canNavigate);
      }
      return of(true);
    }
    return of(false);
  }
}
