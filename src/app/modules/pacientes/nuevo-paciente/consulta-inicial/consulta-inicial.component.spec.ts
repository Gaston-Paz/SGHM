import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaInicialComponent } from './consulta-inicial.component';

describe('ConsultaInicialComponent', () => {
  let component: ConsultaInicialComponent;
  let fixture: ComponentFixture<ConsultaInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaInicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
