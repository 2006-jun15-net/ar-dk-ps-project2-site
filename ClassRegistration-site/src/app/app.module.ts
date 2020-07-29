import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG } from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { StudentComponent } from './components/student/student.component';
import { CourseComponent } from './components/course/course.component';

import { StudentService } from './services/student.service';
import { CourseService } from './services/course.service';

import { AUTH } from './config';

const routes: Routes = [
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'student',
    component: StudentComponent
  },
  {
    path: 'courses',
    component: CourseComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    CourseComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    OktaAuthModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: AUTH },
    StudentService,
    CourseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
