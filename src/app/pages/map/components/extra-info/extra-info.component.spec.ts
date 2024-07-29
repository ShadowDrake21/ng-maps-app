import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraInfoComponent } from './extra-info.component';

describe('ExtraInfoComponent', () => {
  let component: ExtraInfoComponent;
  let fixture: ComponentFixture<ExtraInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
