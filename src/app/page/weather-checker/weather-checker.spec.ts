import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherChecker } from './weather-checker';

describe('WeatherChecker', () => {
  let component: WeatherChecker;
  let fixture: ComponentFixture<WeatherChecker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherChecker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherChecker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
