import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Passwordgenerator } from './passwordgenerator';

describe('Passwordgenerator', () => {
  let component: Passwordgenerator;
  let fixture: ComponentFixture<Passwordgenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Passwordgenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Passwordgenerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
