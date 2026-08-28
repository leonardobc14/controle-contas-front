import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Matriz } from './matriz';

describe('Matriz', () => {
  let component: Matriz;
  let fixture: ComponentFixture<Matriz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Matriz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Matriz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
