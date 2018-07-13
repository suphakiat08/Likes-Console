import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ManageComponent } from '../app-dialog/manage/manage.component';
import { DeleteComponent } from '../app-dialog/delete/delete.component';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.css']
})
export class AppTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['position', 'prod_name', 'serial_number', 'switch', 'token', 'operation'];
  dataSource: any;

  now = Date.now();

  constructor(
    private dialog: MatDialog,
    private service: DatabaseService
  ) { }

  ngOnInit() {
    this.getClient();
    setTimeout(() => {
      this.ngOnInit();
    }, 60000);
  }

  public getClient() {
    this.service.get(
      'https://localhost:3000/clients'
    ).then((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  addClient(data) {
    console.log(data);
    this.service.post(
      'https://localhost:3000/clients',
      data
    ).then(() => {
      this.getClient();
    });
  }

  editClient(id, data) {
    this.service.put(
      'https://localhost:3000/clients',
      id,
      data
    ).then(() => {
      this.getClient();
    });
  }

  switchChange(id, serial_number, status) {
    this.service.put(
      'https://localhost:3000/clients',
      id,
      { serial_number: serial_number, switch: status }
    ).then(() => {
      this.getClient();
    });
  }

  deleteClient(id) {
    this.service.delete(
      'https://localhost:3000/clients',
      id
    ).then(() => {
      this.getClient();
    })
  }

  openDialogAdd() {
    this.dialog.open(ManageComponent, {
      data: {},
      width: '800px',
      maxHeight: '900px',
      autoFocus: false
    }).afterClosed().subscribe(result => {
      if (result) {
        this.addClient(result);
      }
    });
  }

  openDialogEdit(data) {
    this.dialog.open(ManageComponent, {
      data: data,
      width: '800px',
      maxHeight: '900px',
      autoFocus: false
    }).afterClosed().subscribe(result => {
      if (result) {
        this.editClient(data._id, result);
      }
    });
  }

  openDialogDelete(id, prod_name) {
    this.dialog.open(DeleteComponent, {
      data: prod_name,
      width: '500px',
      autoFocus: false
    }).afterClosed().subscribe(result => {
      if (result) {
        this.deleteClient(id);
      }
    });
  }

}