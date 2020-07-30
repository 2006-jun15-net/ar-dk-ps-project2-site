import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course/course.component'
import { StudentComponent } from './components/student/student.component'

const routes: Routes = [
  // { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'course', component: CourseComponent },
  { path: 'student', component: StudentComponent },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

 