import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAvailableInfoComponent } from './no-available-info.component';

describe('NoAvailableInfoComponent', () => {
  let component: NoAvailableInfoComponent;
  let fixture: ComponentFixture<NoAvailableInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoAvailableInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoAvailableInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
