import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPicoPlacaComponent } from './asignar-pico-placa.component';

describe('AsignarPicoPlacaComponent', () => {
  let component: AsignarPicoPlacaComponent;
  let fixture: ComponentFixture<AsignarPicoPlacaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarPicoPlacaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarPicoPlacaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
