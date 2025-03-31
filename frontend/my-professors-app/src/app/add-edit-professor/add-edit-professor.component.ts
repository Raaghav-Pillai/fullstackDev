import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfessorService } from '../professor.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-add-edit-professor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './add-edit-professor.component.html',
  styleUrls: ['./add-edit-professor.component.css']
})
export class AddEditProfessorComponent implements OnInit {
  professorForm: FormGroup;
  professorId: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private professorService: ProfessorService
  ) {
    this.professorForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      experience: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.professorId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.professorId;

    if (this.isEditMode) {
      this.professorService.getProfessors().subscribe((data) => {
        const professor = data.find((p: any) => p._id === this.professorId);
        if (professor) {
          this.professorForm.patchValue(professor);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.professorForm.invalid) return;

    const data = this.professorForm.value;

    if (this.isEditMode && this.professorId) {
      this.professorService.updateProfessor(this.professorId, data).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.professorService.createProfessor(data).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}