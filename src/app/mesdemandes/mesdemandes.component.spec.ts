import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesdemandesComponent } from './mesdemandes.component';

describe('MesdemandesComponent', () => {
  let component: MesdemandesComponent;
  let fixture: ComponentFixture<MesdemandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesdemandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesdemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
