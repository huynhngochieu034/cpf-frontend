import { TestBed } from '@angular/core/testing';

import { BusdataService } from './busdata.service';

describe('BusdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusdataService = TestBed.get(BusdataService);
    expect(service).toBeTruthy();
  });
});
