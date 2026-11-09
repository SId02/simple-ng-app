import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Randomuser } from './randomuser';

describe('Randomuser', () => {
  let component: Randomuser;
  let fixture: ComponentFixture<Randomuser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Randomuser],
    }).compileComponents();

    fixture = TestBed.createComponent(Randomuser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
