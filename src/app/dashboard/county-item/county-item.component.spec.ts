import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountyItemComponent } from './county-item.component';

describe('CountyItemComponent', () => {
  let component: CountyItemComponent;
  let fixture: ComponentFixture<CountyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
