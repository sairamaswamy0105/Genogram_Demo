import { TestBed } from '@angular/core/testing';

import { GetAllRelationsOfUserService } from './get-all-relations-of-user.service';

describe('GetAllRelationsOfUserService', () => {
  let service: GetAllRelationsOfUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllRelationsOfUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
