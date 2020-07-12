import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronaMapComponent } from './corona-map.component';

describe('CoronaMapComponent', () => {
  let component: CoronaMapComponent;
  let fixture: ComponentFixture<CoronaMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronaMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronaMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
