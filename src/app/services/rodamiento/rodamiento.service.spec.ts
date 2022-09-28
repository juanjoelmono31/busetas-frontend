import { TestBed } from '@angular/core/testing';

import { RodamientoService } from './rodamiento.service';

describe('RodamientoService', () => {
  let service: RodamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RodamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
