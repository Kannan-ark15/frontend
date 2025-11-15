import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareLogic } from './compare-logic';

describe('CompareLogic', () => {
  let component: CompareLogic;
  let fixture: ComponentFixture<CompareLogic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompareLogic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareLogic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
