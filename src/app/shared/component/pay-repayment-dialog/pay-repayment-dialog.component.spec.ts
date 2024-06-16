import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayRepaymentDialogComponent } from './pay-repayment-dialog.component';

describe('PayRepaymentDialogComponent', () => {
  let component: PayRepaymentDialogComponent;
  let fixture: ComponentFixture<PayRepaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayRepaymentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayRepaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
