import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course, Student } from '../models/models';
import { Observable } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';
import { API_ORIGIN, API_HEADERS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) { }

  //getting student details
  async getStudentDetails(): Promise<Observable<Student>> {

    const accessToken = await this.oktaAuth.getAccessToken();
    const user = await this.oktaAuth.getUser();

    return this.http.get<Student>(
      `http://localhost:47144/api/Student?FirstName=${user.given_name}&LastName=${user.family_name}`,
      API_HEADERS(accessToken));
  }


  //getting courses of a particular student
  async getCourses(id: number): Promise<Observable<Course[]>> {

    const accessToken = await this.oktaAuth.getAccessToken();

    return this.http.get<Course[]>(`${API_ORIGIN}/api/Student/${id}/courses`, API_HEADERS(accessToken))
  }

  //getting total amount owed 
  getAmount(id: number, semester: string): Observable<any> {
    return this.http.get<any>(`${API_ORIGIN}/api/Student/${id}/${semester}`)
  }

  //geeting the discount based on the resident type
  getDiscount(id: number): Observable<any> {
    return this.http.get<any>(`${API_ORIGIN}/api/Student/${id}/discount`)
  }

  //getting credits for a student in a specified term
  getTotalCredits(id: number, semester: string): Observable<any> {
    return this.http.get<any>(`${API_ORIGIN}/api/Enrollment/${id}/${semester}`)
  }
}
