import { NgModule } from '@angular/core';
import {
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatDialogModule,
        MatSortModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        MatIconModule,
        MatTabsModule,
        MatCheckboxModule,
        MatSelectModule,
        MatOptionModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatDialogModule,
        MatSortModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        MatIconModule,
        MatTabsModule,
        MatCheckboxModule,
        MatSelectModule,
        MatOptionModule,
        MatCardModule,
        MatProgressSpinnerModule
    ]
})

export class MaterialModule { }