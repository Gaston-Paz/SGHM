import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiosMedicosComponent } from './estudios-medicos.component';

describe('EstudiosMedicosComponent', () => {
  let component: EstudiosMedicosComponent;
  let fixture: ComponentFixture<EstudiosMedicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudiosMedicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiosMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
