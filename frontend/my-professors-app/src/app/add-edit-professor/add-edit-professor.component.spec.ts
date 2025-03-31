import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProfessorComponent } from './add-edit-professor.component';

describe('AddEditProfessorComponent', () => {
  let component: AddEditProfessorComponent;
  let fixture: ComponentFixture<AddEditProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
