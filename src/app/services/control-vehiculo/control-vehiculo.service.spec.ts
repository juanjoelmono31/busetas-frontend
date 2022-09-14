import { TestBed } from '@angular/core/testing';

import { ControlVehiculoService } from './control-vehiculo.service';

describe('ControlVehiculoService', () => {
  let service: ControlVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
