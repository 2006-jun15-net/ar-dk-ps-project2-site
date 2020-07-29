import { Injectable } from '@angular/core';
import { API_ORIGIN, API_HEADERS } from '../config';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/models';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) { }

  async getAllCourses(): Promise<Observable<Course[]>> {

    const accessToken = await this.oktaAuth.getAccessToken();
    return this.http.get<Course[]>(`${API_ORIGIN}/api/Course`, API_HEADERS(accessToken));
  }

  async getCourseByName(courseName: string): Promise<Observable<Course>> {

    const accessToken = await this.oktaAuth.getAccessToken();
    return this.http.get<Course>(`${API_ORIGIN}/api/Course/class/${courseName}`, API_HEADERS(accessToken));
  }
}
