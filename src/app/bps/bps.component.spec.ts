import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpsComponent } from './bps.component';

describe('BpsComponent', () => {
  let component: BpsComponent;
  let fixture: ComponentFixture<BpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
