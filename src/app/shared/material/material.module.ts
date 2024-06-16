import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from "@angular/material/menu";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';  // Додано

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [
        MatFormFieldModule,
        MatToolbarModule,
        MatDividerModule,
        MatListModule,
        MatCardModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatButtonModule,
        MatTooltipModule,
        MatMenuModule,
        MatTableModule,
    ]
})
export class MaterialModule { }
