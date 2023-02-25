import { TestBed } from '@angular/core/testing';

import { IsSignedOutGuard } from './is-signed-out.guard';

describe('IsSignedOutGuard', () => {
  let guard: IsSignedOutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsSignedOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
