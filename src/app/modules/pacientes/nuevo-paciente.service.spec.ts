import { TestBed } from '@angular/core/testing';

import { NuevoPacienteService } from './nuevo-paciente.service';

describe('NuevoPacienteService', () => {
  let service: NuevoPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevoPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
