import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { ClassRegistrationApiService } from './class-registration-api.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({ 
  declarations: [
    AppComponent,
    CourseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ClassRegistrationApiService],
  // providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
