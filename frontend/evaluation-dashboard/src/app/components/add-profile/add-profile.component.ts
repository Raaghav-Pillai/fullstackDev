import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfessorService } from '../../services/professor.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  imports: [ReactiveFormsModule],
})
export class AddProfileComponent {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private professorService: ProfessorService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      school: ['', Validators.required],
      gpa: [null, Validators.required],
      major: ['', Validators.required],
      project: [''],
      skill: ['']
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.professorService.add(this.profileForm.value);
      this.router.navigate(['/']);
    }
  }
}