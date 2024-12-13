import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarklightmodeComponent } from './darklightmode.component';

describe('DarklightmodeComponent', () => {
  let component: DarklightmodeComponent;
  let fixture: ComponentFixture<DarklightmodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarklightmodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarklightmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
