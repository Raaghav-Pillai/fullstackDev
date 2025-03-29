import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../models/professor.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  professors: Professor[] = [];

  constructor(private professorService: ProfessorService, private router: Router) {}

  ngOnInit(): void {
    this.professors = this.professorService.getAll();
  }

  goToProfile(name: string) {
    this.router.navigate(['/profile', name]);
  }

  editProfile(name: string) {
    this.router.navigate(['/edit', name]);
  }
}