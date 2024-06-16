import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../services/user.service';

export interface DialogData {
    id: string;
    name: string;
    surname: string;
    email: string;
    isEdit: boolean;
}

@Component({
    selector: 'app-edit-user-dialog',
    templateUrl: './create-edit-user-dialog.component.html',
    styleUrls: ['./create-edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {
    userForm: FormGroup;
    public title: string = this.data.isEdit ? 'Редагувати користувача' : 'Добавити нового користувача';

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<EditUserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private userService: UserService
    ) {
        this.userForm = this.formBuilder.group({
            name: [this.data.name, [Validators.required, Validators.minLength(4)]],
            surname: [this.data.surname, [Validators.required, Validators.minLength(3)]],
            email: [this.data.email, [Validators.required, Validators.email]]
        });
    }

    onSubmit(): void {
        if (this.userForm.valid) {
            if (this.data.isEdit) {
                this.userService.editUser(this.userForm.value).subscribe(() => {
                    this.dialogRef.close(this.data.id);
                });
            } else {
                this.dialogRef.close(this.userForm.value);
            }
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
