import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student, Review, Enrollment } from '../models/models';
import { Observable } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';
import { API_ORIGIN, API_HEADERS } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private student: Student = {} as Student;
  private enrollments: Enrollment[] = [];

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) { }

  //getting student details
  async fetchStudentDetails(): Promise<Observable<Student>> {

    const accessToken = await this.oktaAuth.getAccessToken();
    const user = await this.oktaAuth.getUser();

    let firstName: string = '';
    let lastName: string = '';

    if (user !== undefined) {

      firstName = user.given_name as string;
      lastName = user.family_name as string;
    }

    const getResponse = this.http.get<Student>(
      `${API_ORIGIN}/api/Student?FirstName=${firstName}&LastName=${lastName}`,
      API_HEADERS(accessToken));

    return getResponse;
  }

  // getting total amount owed 
  async getAmount(id: number, semester: string): Promise<Observable<number>> {

    const accessToken = await this.oktaAuth.getAccessToken();
    const getResponse = this.http.get<number>(`${API_ORIGIN}/api/Student/${id}/${semester}`, API_HEADERS(accessToken));

    return getResponse;
  }

  // getting the discount based on the resident type
  async getDiscount(id: number): Promise<Observable<number>> {

    const accessToken = await this.oktaAuth.getAccessToken();
    const getResponse = this.http.get<number>(`${API_ORIGIN}/api/Student/${id}/discount`, API_HEADERS(accessToken));

    return getResponse;
  }

  async getEnrollments(id: number, term: string): Promise<Observable<Enrollment[]>> {

    const accessToken = await this.oktaAuth.getAccessToken();
    const getResponse = this.http.get<Enrollment[]>(`${API_ORIGIN}/api/Student/${id}/${term}/courses`, API_HEADERS(accessToken));

    return getResponse;
  }

  async createReview(text: string, score: number, courseId: number, studentId: number) {

    const accessToken = await this.oktaAuth.getAccessToken();

    let review: any = {
      text: text,
      score: score,
      courseId: courseId,
      studentId: studentId
    };

    return this.http.post(`${API_ORIGIN}/api/Reviews`, review, API_HEADERS(accessToken));
  }

  async deleteEnrollment(enrollmentId: number, studentId: number) {

    const accessToken = await this.oktaAuth.getAccessToken();
    return this.http.delete(`${API_ORIGIN}/api/Enrollment/${enrollmentId}?studentId=${studentId}`, API_HEADERS(accessToken));
  }
}
