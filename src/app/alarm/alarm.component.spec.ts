import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmComponent } from './alarm.component';

describe('AlarmComponent', () => {
  let component: AlarmComponent;
  let fixture: ComponentFixture<AlarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlarmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
