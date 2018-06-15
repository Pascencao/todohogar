import { TestBed, inject } from '@angular/core/testing';

import { GuidHelperService } from './guid-helper.service';

describe('GuidHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuidHelperService]
    });
  });

  it('should be created', inject([GuidHelperService], (service: GuidHelperService) => {
    expect(service).toBeTruthy();
  }));
});
