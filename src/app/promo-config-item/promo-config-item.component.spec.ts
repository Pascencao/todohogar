import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoConfigItemComponent } from './promo-config-item.component';

describe('PromoConfigItemComponent', () => {
  let component: PromoConfigItemComponent;
  let fixture: ComponentFixture<PromoConfigItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoConfigItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoConfigItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
