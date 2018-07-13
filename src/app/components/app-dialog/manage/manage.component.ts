import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, MinLengthValidator, FormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MyCookieService } from '../../../services/cookie.service';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  mainGroup: FormGroup;
  tokenException = false;
  other: {
    promotion: boolean,
    stock: boolean,
    limited: boolean,
    hot_sale: boolean
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ManageComponent>,
    private cookie: MyCookieService
  ) { }

  ngOnInit() {
    this.clear();
    this.initInput();
    this.mainGroup = new FormGroup({
      'serial_number': new FormControl(this.data.serial_number, [
        Validators.required,
        Validators.minLength(16)
      ]),
      'url': new FormControl(this.data.url, Validators.required),
      'post_id': new FormControl(this.data.post_id),
      'prod_name': new FormControl(this.data.prod_name, Validators.required),
      'price': new FormControl(this.data.price, [
        Validators.required,
        Validators.min(0),
        Validators.max(9999999)
      ]),
      'icons': new FormGroup({
        'promotion': new FormGroup({
          'amount': new FormControl(this.data.icons.promotion.amount),
          'unit': new FormControl(this.data.icons.promotion.unit),
          'date': new FormControl(this.data.icons.promotion.date),
          'time': new FormControl(this.data.icons.promotion.time)
        }),
        'stock': new FormGroup({
          'quantity': new FormControl(this.data.icons.stock.quantity)
        }),
        'limited': new FormGroup({
          'quantity': new FormControl(this.data.icons.limited.quantity)
        }),
        'hot_sale': new FormControl(this.other.hot_sale)
      }),
      'token': new FormControl(this.cookie.getCookie('token')),
      'expire': new FormControl(this.cookie.getCookie('expire')),
      'switch': new FormControl(this.data.switch)
    });
  }

  initInput() {
    if (this.data.icons) {
      this.data.icons.promotion && Object.keys(this.data.icons.promotion).length ?
        this.other.promotion = true :
        this.data.icons.promotion = {};

      this.data.icons.stock && Object.keys(this.data.icons.stock).length ?
        this.other.stock = true :
        this.data.icons.stock = {};

      this.data.icons.limited && Object.keys(this.data.icons.limited).length ?
        this.other.limited = true :
        this.data.icons.limited = {};

      this.data.icons.hot_sale ?
        this.other.hot_sale = true : null;

    } else {
      this.data.icons = {
        promotion: {},
        stock: {},
        limited: {}
      }
    }
  }

  submit() {
    if (this.cookie.getCookie('token')) {
      this.resultSet();
      this.dialogRef.close(this.mainGroup.value);
    } else {
      this.tokenException = true;
      return false;
    }
  }

  clear() {
    this.other = {
      promotion: false,
      stock: false,
      limited: false,
      hot_sale: false
    }
  }

  resultSet() {
    !this.mainGroup.value.switch ?
      this.mainGroup.value.switch = false : null;

    if (!this.other.promotion && !this.other.stock && !this.other.limited && !this.other.hot_sale) {
      delete this.mainGroup.value.icons;
    } else {
      !this.other.promotion || !Object.keys(this.mainGroup.value.icons.promotion).length ?
        delete this.mainGroup.value.icons.promotion : null;

      !this.other.stock || !Object.keys(this.mainGroup.value.icons.stock).length ?
        delete this.mainGroup.value.icons.stock : null;

      !this.other.limited || !Object.keys(this.mainGroup.value.icons.limited).length ?
        delete this.mainGroup.value.icons.limited : null;

      this.other.hot_sale ?
        this.mainGroup.value.icons.hot_sale = true :
        delete this.mainGroup.value.icons.hot_sale;
    }

    let pageID;
    let postID;
    let arr = this.mainGroup.value.url.split("/");
    pageID = arr[3];
    arr[arr.length - 1].charAt(0) == "?" ?
      (postID = arr[arr.length - 2]) :
      (postID = arr[arr.length - 1]);
    this.mainGroup.value.post_id = pageID + "_" + postID;

    !this.mainGroup.value.expire ?
      this.mainGroup.value.expire = 2147483648000 : null;
  }

  matcher = new MyErrorStateMatcher();
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}