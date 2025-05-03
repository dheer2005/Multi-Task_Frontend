import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JSONViewerComponent } from './json-viewer.component';

describe('JSONViewerComponent', () => {
  let component: JSONViewerComponent;
  let fixture: ComponentFixture<JSONViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JSONViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JSONViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
