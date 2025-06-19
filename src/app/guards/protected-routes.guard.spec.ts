import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { protectedRoutesGuard } from './protected-routes.guard';

describe('protectedRoutesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => protectedRoutesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
