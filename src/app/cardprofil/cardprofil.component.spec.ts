import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardprofilComponent } from './cardprofil.component';

describe('CardprofilComponent', () => {
  let component: CardprofilComponent;
  let fixture: ComponentFixture<CardprofilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardprofilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
