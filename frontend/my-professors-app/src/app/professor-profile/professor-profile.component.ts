import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfessorService } from '../professor.service';

@Component({
  selector: 'app-professor-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './professor-profile.component.html',
  styleUrls: ['./professor-profile.component.css']
})
export class ProfessorProfileComponent implements OnInit {
  professor: any = null; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private professorService: ProfessorService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.professorService.getProfessorById(id).subscribe((data) => {
        this.professor = data;
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}