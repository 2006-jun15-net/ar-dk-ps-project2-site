import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Student } from './student-model';
import { FetchDataService } from './fetch-data.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  student: Student;
  error: HttpErrorResponse;

  constructor(private oktaAuth: OktaAuthService, private fetchService: FetchDataService) { }

  async fetchStudent() {

    const user = await this.oktaAuth.getUser();
    const response = await this.fetchService.response(`http://localhost:47144/api/student?FirstName=${user.given_name}&LastName=${user.family_name}/`);

    response.subscribe(
      value => this.student = value as Student,
      error => this.error = error as HttpErrorResponse
    )
  }

  getStudent() {
    return of(this.student);
  }
}
