import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractDialogComponent } from './create-contract-dialog.component';

describe('CreateContractDialogComponent', () => {
  let component: CreateContractDialogComponent;
  let fixture: ComponentFixture<CreateContractDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateContractDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateContractDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
