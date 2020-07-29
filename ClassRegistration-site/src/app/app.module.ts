import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { ClassRegistrationApiService } from './class-registration-api.service';
import { AppRoutingModule } from './app-routing.module';
import { FilterCoursePipe } from './filter-course.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({ 
  declarations: [
    AppComponent,
    CourseComponent,
    FilterCoursePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
    //Ng2SearchPipeModule
  ],
  providers: [ClassRegistrationApiService],
  // providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
