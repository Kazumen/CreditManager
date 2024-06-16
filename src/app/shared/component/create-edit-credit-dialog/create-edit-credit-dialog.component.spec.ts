import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCreditDialogComponent } from './create-edit-credit-dialog.component';

describe('CreateEditCreditDialogComponent', () => {
  let component: CreateEditCreditDialogComponent;
  let fixture: ComponentFixture<CreateEditCreditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditCreditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditCreditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
