import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfessorProfileComponent } from './components/professor-profile/professor-profile.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'add', component: AddProfileComponent },
  { path: 'edit/:name', component: EditProfileComponent },
  { path: 'profile/:name', component: ProfessorProfileComponent },
];