import { TestBed } from '@angular/core/testing';

import { TrafficUrlService } from './traffic-url.service';

describe('TrafficUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrafficUrlService = TestBed.get(TrafficUrlService);
    expect(service).toBeTruthy();
  });
});
