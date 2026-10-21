import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dragdrop } from './dragdrop';

describe('Dragdrop', () => {
  let component: Dragdrop;
  let fixture: ComponentFixture<Dragdrop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dragdrop],
    }).compileComponents();

    fixture = TestBed.createComponent(Dragdrop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
