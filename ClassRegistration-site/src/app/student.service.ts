import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Course, Student, Enrollment } from './models';
import { FetchDataService } from './fetch-data.service';
import { API_ORIGIN } from './config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) { }

  async getStudent(): Promise<Observable<Student>> {

    const user = await this.oktaAuth.getUser();
    const accessToken = await this.oktaAuth.getAccessToken();

    const response = this.http.get(`${API_ORIGIN}/api/student?FirstName=${user.given_name}&LastName=${user.family_name}/`,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken
        },
        withCredentials: true
      });

    return response.pipe(map<Object, Student>(data => data as Student));
  }

  async getEnrollments(studentId: number): Promise<Observable<Enrollment[]>> {

    const accessToken = await this.oktaAuth.getAccessToken();

    const response = this.http.get(`${API_ORIGIN}/api/student/${studentId}/courses`,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken
        },
        withCredentials: true
      });

    return response.pipe(map<Object, Enrollment[]>(data => data as Enrollment[]));
  }
}
