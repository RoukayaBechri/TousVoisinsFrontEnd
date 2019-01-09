import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoisinsComponent } from './voisins.component';

describe('VoisinsComponent', () => {
  let component: VoisinsComponent;
  let fixture: ComponentFixture<VoisinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoisinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoisinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
