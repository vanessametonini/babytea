import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenKey = 'bbt-token';

  constructor() { }

  getToken(): string {
    return localStorage.getItem(this.tokenKey)
  }

  setToken(apiToken: string): void {
    localStorage.setItem(this.tokenKey, apiToken)
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('bbt-user');
  }

}
