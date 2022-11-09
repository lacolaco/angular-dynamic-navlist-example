import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _isLoggedIn = new BehaviorSubject(false);
  private _isAdmin = new BehaviorSubject(false);

  login() {
    this._isLoggedIn.next(true);
  }

  logout() {
    this._isLoggedIn.next(false);
  }

  makeAdmin() {
    this._isAdmin.next(true);
  }

  revokeAdmin() {
    this._isAdmin.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  isLoggedInAsAdmin(): Observable<boolean> {
    return combineLatest([this._isLoggedIn, this._isAdmin]).pipe(
      map(([isLoggedIn, isAdmin]) => isLoggedIn && isAdmin)
    );
  }
}
