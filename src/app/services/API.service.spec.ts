import { TestBed } from '@angular/core/testing';

import { JsonPlaceholderClientService } from './API.service';

describe('JsonPlaceholderClientService', () => {
  let service: JsonPlaceholderClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonPlaceholderClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
