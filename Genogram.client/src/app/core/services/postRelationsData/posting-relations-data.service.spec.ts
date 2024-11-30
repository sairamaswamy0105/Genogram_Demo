import { TestBed } from '@angular/core/testing';

import { PostingRelationsDataService } from './posting-relations-data.service';

describe('PostingRelationsDataService', () => {
  let service: PostingRelationsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostingRelationsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
