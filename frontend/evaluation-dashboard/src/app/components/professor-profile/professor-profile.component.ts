import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../models/professor.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-professor-profile',
  templateUrl: './professor-profile.component.html',
  imports: [CommonModule],
})
export class ProfessorProfileComponent implements OnInit {
  professor?: Professor;

  constructor(private route: ActivatedRoute, private service: ProfessorService) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.professor = this.service.getByName(name);
    }
  }
}
