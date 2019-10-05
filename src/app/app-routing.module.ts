import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './views/student-list/student-list.component';
import { StudentDetailComponent } from './views/student-detail/student-detail.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: StudentListComponent
  },
  {
    path: 'edit/:studentId',
    component: StudentDetailComponent
  },
  {
    path: 'add',
    component: StudentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
