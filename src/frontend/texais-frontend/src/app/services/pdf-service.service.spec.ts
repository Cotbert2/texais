import { TestBed } from '@angular/core/testing';

import { PdfServiceService } from './pdf-service.service';

describe('PdfServiceService', () => {
  let service: PdfServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
