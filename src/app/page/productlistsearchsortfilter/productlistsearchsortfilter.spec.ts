import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Productlistsearchsortfilter } from './productlistsearchsortfilter';

describe('Productlistsearchsortfilter', () => {
  let component: Productlistsearchsortfilter;
  let fixture: ComponentFixture<Productlistsearchsortfilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productlistsearchsortfilter],
    }).compileComponents();

    fixture = TestBed.createComponent(Productlistsearchsortfilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
