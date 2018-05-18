import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfigItemComponent } from './product-config-item.component';

describe('ProductConfigItemComponent', () => {
  let component: ProductConfigItemComponent;
  let fixture: ComponentFixture<ProductConfigItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductConfigItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConfigItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
