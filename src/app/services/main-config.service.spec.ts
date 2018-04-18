import { TestBed, inject } from '@angular/core/testing';

import { MainConfigService } from './main-config.service';

describe('MainConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainConfigService]
    });
  });

  it('should be created', inject([MainConfigService], (service: MainConfigService) => {
    expect(service).toBeTruthy();
  }));
});
