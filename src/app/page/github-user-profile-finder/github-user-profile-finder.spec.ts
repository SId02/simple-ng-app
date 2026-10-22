import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubUserProfileFinder } from './github-user-profile-finder';

describe('GithubUserProfileFinder', () => {
  let component: GithubUserProfileFinder;
  let fixture: ComponentFixture<GithubUserProfileFinder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubUserProfileFinder],
    }).compileComponents();

    fixture = TestBed.createComponent(GithubUserProfileFinder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
