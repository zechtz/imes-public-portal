import { TestBed } from '@angular/core/testing';

import { LoaderInterceptorServiceService } from './loader-interceptor-service.service';

describe('LoaderInterceptorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaderInterceptorServiceService = TestBed.get(LoaderInterceptorServiceService);
    expect(service).toBeTruthy();
  });
});
