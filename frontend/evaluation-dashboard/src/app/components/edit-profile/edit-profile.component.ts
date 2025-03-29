import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from '../../services/professor.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; 

@Component({
  standalone: true,
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  imports: [ReactiveFormsModule], // ✅ Include this
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  name!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private professorService: ProfessorService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      school: [''],
      gpa: [0],
      major: [''],
      project: [''],
      skill: ['']
    });
  }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name')!;
    const professor = this.professorService.getByName(this.name);
    if (professor) {
      this.profileForm.setValue({ ...professor });
    }
  }

  onSubmit() {
    this.professorService.update(this.name, this.profileForm.value);
    this.router.navigate(['/']);
  }
}