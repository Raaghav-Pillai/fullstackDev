import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from '../professor.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-professor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './add-edit-professor.component.html',
  styleUrls: ['./add-edit-professor.component.css']
})

export class AddEditProfessorComponent implements OnInit {
  professorForm!: FormGroup;
  isEditMode = false;
  professorId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private professorService: ProfessorService
  ) {}

  ngOnInit(): void {
    this.professorId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.professorId;

    this.professorForm = this.fb.group({
      name: ['', Validators.required],
      total_citations: [0],
      total_publications: [0],
      publications: this.fb.array([])
    });

    if (this.isEditMode) {
      this.professorService.getProfessorById(this.professorId!).subscribe((data) => {
        this.professorForm.patchValue({
          name: data.name,
          total_citations: data.total_citations,
          total_publications: data.total_publications
        });
        data.publications?.forEach((pub: any) => {
          this.addPublication(pub);
        });
      });
    }
  }

  get publications(): FormArray {
    return this.professorForm.get('publications') as FormArray;
  }

  addPublication(pub: any = {}): void {
    this.publications.push(
      this.fb.group({
        title: [pub.title || '', Validators.required],
        type: [pub.type || ''],
        doi: [pub.doi || ''],
        publication_year: [pub.publication_year || ''],
        publication_date: [pub.publication_date || ''],
        cited_by_count: [pub.cited_by_count || 0],
        journal: [pub.journal || ''],
        authors: [pub.authors ? pub.authors.join(', ') : '']
      })
    );
  }

  removePublication(index: number): void {
    this.publications.removeAt(index);
  }

  onSubmit(): void {
    const formValue = this.professorForm.value;
    const payload = {
      ...formValue,
      publications: formValue.publications.map((pub: any) => ({
        ...pub,
        authors: pub.authors.split(',').map((a: string) => a.trim())
      }))
    };

    if (this.isEditMode) {
      this.professorService.updateProfessor(this.professorId!, payload).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.professorService.createProfessor(payload).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}