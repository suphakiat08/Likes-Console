import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AppDialogComponent } from '../app-dialog/access-token/app-dialog.component';
import { AppTableComponent } from '../app-table/app-table.component';

@Component({
  selector: 'app-nev',
  templateUrl: './app-nev.component.html',
  styleUrls: ['./app-nev.component.css']
})
export class AppNevComponent implements OnInit {

  expire: number;
  now: number;

  constructor(
    private dialog: MatDialog,
    private appTable: AppTableComponent
  ) { }

  ngOnInit() {
    this.now = new Date().getTime();
  }

  openDialog() {
    this.dialog.open(AppDialogComponent, {
      data: {},
      width: '645px',
      autoFocus: false
    }).beforeClose().subscribe(res => {
      this.appTable.ngOnInit();
    });
  }

  expireIcon() {
    if (this.expire >= this.now) {
      return true;
    } else {
      return false;
    }
  }
}