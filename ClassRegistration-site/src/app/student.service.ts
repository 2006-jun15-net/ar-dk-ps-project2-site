import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Course, Student } from './models';
import { FetchDataService } from './fetch-data.service';
import { API_ORIGIN } from './config';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  student: Student;
  error: HttpErrorResponse;

  constructor(private oktaAuth: OktaAuthService, private fetchService: FetchDataService) { }

  async fetchStudent() {

    const user = await this.oktaAuth.getUser();
    const response = await this.fetchService.response<Student>(`${API_ORIGIN}/api/student?FirstName=${user.given_name}&LastName=${user.family_name}/`);

    response.subscribe(
      value => this.student = value as Student,
      error => this.error = error as HttpErrorResponse
    )
  }

  getStudent() {
    return of(this.student);
  }

  async getCourses() {
    return await this.fetchService.response<Course[]>(`${API_ORIGIN}/api/student/${this.student.studentId}/courses`);
  }
}
