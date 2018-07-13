import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MyCookieService {

  constructor(private cookie: CookieService) { }

  setCookie(key, value) {
    this.cookie.set(key, value);
  }

  getCookie(key) {
    return this.cookie.get(key);
  }

  deleteCookie() {
    this.cookie.deleteAll();
  }
}
