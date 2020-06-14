import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoutryDetailsComponent } from './coutry-details.component';

describe('CoutryDetailsComponent', () => {
  let component: CoutryDetailsComponent;
  let fixture: ComponentFixture<CoutryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoutryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoutryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
