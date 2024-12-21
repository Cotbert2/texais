import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameLogoComponent } from './frame-logo.component';

describe('FrameLogoComponent', () => {
  let component: FrameLogoComponent;
  let fixture: ComponentFixture<FrameLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrameLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
