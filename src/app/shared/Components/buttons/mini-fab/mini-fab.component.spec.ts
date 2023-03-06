import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniFabComponent } from './mini-fab.component';

describe('MiniFabComponent', () => {
  let component: MiniFabComponent;
  let fixture: ComponentFixture<MiniFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniFabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
