import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { FacebookService } from '../../../services/facebook.service';
import { MyCookieService } from '../../../services/cookie.service';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.css']
})
export class AppDialogComponent implements OnInit {

  formGroup: FormGroup;
  users: {
    name: string,
    token: string,
    expire: number
  };
  selectedIndex = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public facebook: FacebookService,
    public cookie: MyCookieService,
    private service: DatabaseService,
  ) {
    this.formBuild();
  }

  ngOnInit() {
    this.initUser(
      this.cookie.getCookie('name'),
      this.cookie.getCookie('token'),
      this.cookie.getCookie('expire')
    );
  }

  formBuild() {
    this.formGroup = new FormGroup({
      'token': new FormControl(null, Validators.required),
    });
  }

  signin() {
    this.facebook.signInWithFB()
      .then((user: any) => {
        this.facebook.getExpireFB(user.token)
          .then(res => {
            let date = new Date(res.data.expires_at).getTime() * 1000;
            this.cookie.deleteCookie();
            this.cookie.setCookie('name', user.name);
            this.cookie.setCookie('token', user.token);
            this.cookie.setCookie('expire', date);
            this.ngOnInit();
            this.putToken(
              user.token,
              date
            );
          });
      });
  }

  signout() {
    this.facebook.signOut();
    this.cookie.deleteCookie();
    this.initUser(null, null, null);
  }

  initUser(name, token, expire) {
    if (expire) {
      expire = new Date(parseInt(expire)).toLocaleString();
    }
    this.users = {
      name: name,
      token: token,
      expire: expire
    }
  }

  putToken(token, expire) {
    this.service.putAll(
      'https://localhost:3000/token',
      {
        token: token,
        expire: expire
      }
    );
  }

  addToken() {
    this.facebook.getUserFB(this.formGroup.value.token)
      .then(res => {
        let date = 2147483648000; //max timestamps * 1000
        this.cookie.deleteCookie();
        this.cookie.setCookie('token', this.formGroup.value.token);
        this.cookie.setCookie('name', res.name);
        this.ngOnInit();
        this.putToken(
          this.formGroup.value.token,
          date
        );
      })
    this.selectedIndex -= 1;
  }

  matcher = new MyErrorStateMatcher();
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}