import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

//import { NgbdTablePagination } from './table-pagination';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import  { AppRoutingModule } from 'src/app/app-routing.module';
import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG } from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { StudentComponent } from './components/student/student.component';
import { CourseComponent } from './course/course.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

 
import { ClassRegistrationApiService } from './class-registration-api.service';

const authConfig =
{
  issuer: 'https://dev-638266.okta.com/oauth2/default',
  redirectUri: location.origin + '/implicit/callback',
  clientId: '0oan3a2afYLWJgufo4x6',
  pkce: true,
  scopes: ['openid', 'profile', 'email']

};

const routes: Routes = [
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  }
];

@NgModule({ 
  declarations: [
    AppComponent,
    CourseComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    OktaAuthModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    AppRoutingModule,
  

  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: authConfig },
    ClassRegistrationApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
