import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanBookComponent } from './loan.component';

describe('LoanBookComponent', () => {
  let component: LoanBookComponent;
  let fixture: ComponentFixture<LoanBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
