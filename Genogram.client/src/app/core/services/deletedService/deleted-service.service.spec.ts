import { TestBed } from '@angular/core/testing';

import { DeletedServiceService } from './deleted-service.service';

describe('DeletedServiceService', () => {
  let service: DeletedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
