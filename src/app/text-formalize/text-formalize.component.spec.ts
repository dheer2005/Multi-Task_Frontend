import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFormalizeComponent } from './text-formalize.component';

describe('TextFormalizeComponent', () => {
  let component: TextFormalizeComponent;
  let fixture: ComponentFixture<TextFormalizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextFormalizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextFormalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
