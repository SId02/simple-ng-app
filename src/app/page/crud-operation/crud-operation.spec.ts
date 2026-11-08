import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudOperation } from './crud-operation';

describe('CrudOperation', () => {
  let component: CrudOperation;
  let fixture: ComponentFixture<CrudOperation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudOperation],
    }).compileComponents();

    fixture = TestBed.createComponent(CrudOperation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
