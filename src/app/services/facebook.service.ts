import { Injectable } from '@angular/core';
import { AuthService, FacebookLoginProvider } from 'angular-6-social-login';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor(
    private authService: AuthService,
    private facebook: DatabaseService
  ) { }

  signInWithFB() {
    return this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut() {
    this.authService.signOut();
  }

  getExpireFB(token) {
    return this.facebook.get('https://graph.facebook.com/debug_token?input_token=' + token + '&access_token=2462994850384693|26a6bd3b16116cf0abee86a93d11ca9d');
  }

  getUserFB(token) {
    return this.facebook.get('https://graph.facebook.com/me?access_token=' + token);
  }
}
