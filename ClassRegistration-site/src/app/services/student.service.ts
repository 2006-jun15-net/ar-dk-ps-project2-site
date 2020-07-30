import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course, Student, Enrollment } from '../models/models';
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

    let firstName: string = '';
    let lastName: string = '';

    if (user !== undefined) {

      firstName = user.given_name as string;
      lastName = user.family_name as string;
    }

    return this.http.get<Student>(
      `${API_ORIGIN}/api/Student?FirstName=${firstName}&LastName=${lastName}`,
      API_HEADERS(accessToken));
  }

  //getting courses of a particular student
  async getCourses(id: number): Promise<Observable<Enrollment[]>> {

    const accessToken = await this.oktaAuth.getAccessToken();
    return this.http.get<Enrollment[]>(`${API_ORIGIN}/api/Student/${id}/courses`, API_HEADERS(accessToken))
  }

  //getting total amount owed 
  async getAmount(id: number, semester: string): Promise<Observable<any>> {

    const accessToken = await this.oktaAuth.getAccessToken();
    return this.http.get<any>(`${API_ORIGIN}/api/Student/${id}/${semester}`, API_HEADERS(accessToken))
  }

  //geeting the discount based on the resident type
  async getDiscount(id: number): Promise<Observable<any>> {

    const accessToken = await this.oktaAuth.getAccessToken();
    return this.http.get<any>(`${API_ORIGIN}/api/Student/${id}/discount`, API_HEADERS(accessToken))
  }

  //getting credits for a student in a specified term
  async getTotalCredits(id: number, semester: string): Promise<Observable<any>> {

    const accessToken = await this.oktaAuth.getAccessToken();
    return this.http.get<any>(`${API_ORIGIN}/api/Enrollment/${id}/${semester}`, API_HEADERS(accessToken))
  }
}
