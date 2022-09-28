import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RodamientosComponent } from './rodamientos.component';

describe('RodamientosComponent', () => {
  let component: RodamientosComponent;
  let fixture: ComponentFixture<RodamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RodamientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RodamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
