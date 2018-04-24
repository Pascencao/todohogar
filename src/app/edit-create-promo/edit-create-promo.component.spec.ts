import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreatePromoComponent } from './edit-create-promo.component';

describe('EditCreatePromoComponent', () => {
  let component: EditCreatePromoComponent;
  let fixture: ComponentFixture<EditCreatePromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCreatePromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreatePromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
