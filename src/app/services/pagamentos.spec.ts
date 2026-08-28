import { TestBed } from '@angular/core/testing';

import { Pagamentos } from './pagamentos';

describe('Pagamentos', () => {
  let service: Pagamentos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pagamentos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
