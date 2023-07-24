import { TestBed } from '@angular/core/testing';

import { UserIdService } from './user-id.service';

describe('UserIdService', () => {
  let service: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
