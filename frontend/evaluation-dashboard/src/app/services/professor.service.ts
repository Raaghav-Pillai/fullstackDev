import { Injectable } from '@angular/core';
import { Professor } from '../models/professor.model';
import prannoyData from '../assets/Prannoy Suraneni_data.json';
import nishantData from '../assets/Nishant Garg_data.json';

@Injectable({ providedIn: 'root' })
export class ProfessorService {
  private professors: any[] = [prannoyData, nishantData];

  getAll(): Professor[] {
    return this.professors;
  }

  getByName(name: string): Professor | undefined {
    return this.professors.find(p => p.name === name);
  }

  add(professor: Professor) {
    this.professors.push(professor);
  }

  update(name: string, updated: Professor) {
    const index = this.professors.findIndex(p => p.name === name);
    if (index !== -1) {
      this.professors[index] = updated;
    }
  }
}