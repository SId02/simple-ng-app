import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Darklightmode } from './darklightmode';

describe('Darklightmode', () => {
  let component: Darklightmode;
  let fixture: ComponentFixture<Darklightmode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Darklightmode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Darklightmode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
