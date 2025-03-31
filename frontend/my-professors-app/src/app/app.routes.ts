import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEditProfessorComponent } from './add-edit-professor/add-edit-professor.component';
import { ProfessorProfileComponent } from './professor-profile/professor-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add', component: AddEditProfessorComponent },
  { path: 'edit/:id', component: AddEditProfessorComponent },
  { path: 'professor/:id', component: ProfessorProfileComponent }
];
