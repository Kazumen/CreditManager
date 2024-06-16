import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';

@NgModule({
    declarations: [
        UsersComponent,
        UserComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule,
    ]
})
export class UsersModule { }
