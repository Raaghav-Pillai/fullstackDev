import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfessorService } from '../professor.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  professors: any[] = [];

  constructor(
    private professorService: ProfessorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfessors();
  }

  loadProfessors(): void {
    this.professorService.getProfessors().subscribe({
      next: (data) => (this.professors = data),
      error: (err) => console.error('Error loading professors:', err)
    });
  }

  deleteProfessor(id: string): void {
    this.professorService.deleteProfessor(id).subscribe(() => {
      this.loadProfessors(); // Refresh the list after delete
    });
  }

  editProfessor(id: string): void {
    this.router.navigate(['/edit', id]);
  }

  addProfessor(): void {
    this.router.navigate(['/add']);
  }
}