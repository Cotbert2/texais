import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumerateComponent } from './enumerate.component';

describe('EnumerateComponent', () => {
  let component: EnumerateComponent;
  let fixture: ComponentFixture<EnumerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnumerateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnumerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
