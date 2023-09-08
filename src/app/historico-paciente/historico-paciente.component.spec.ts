import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoPacienteComponent } from './historico-paciente.component';

describe('HistoricoPacienteComponent', () => {
  let component: HistoricoPacienteComponent;
  let fixture: ComponentFixture<HistoricoPacienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoPacienteComponent]
    });
    fixture = TestBed.createComponent(HistoricoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
