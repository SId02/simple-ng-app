import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inifintescroll } from './inifintescroll';

describe('Inifintescroll', () => {
  let component: Inifintescroll;
  let fixture: ComponentFixture<Inifintescroll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inifintescroll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inifintescroll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
