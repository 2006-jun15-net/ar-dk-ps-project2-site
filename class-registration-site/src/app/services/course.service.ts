import { Injectable } from '@angular/core';
import { API_ORIGIN, API_HEADERS } from '../config';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section, Enrollment } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) { }

  async getByName(courseName: string): Promise<Observable<Section>> {

    const accessToken = await this.oktaAuth.getAccessToken();
    return this.http.get<Section>(`${API_ORIGIN}/api/Section/class/${courseName}`, API_HEADERS(accessToken));
  }

  async getByInstructorName(instructorName: string): Promise<Observable<Section[]>> {

    const accessToken = await this.oktaAuth.getAccessToken();
    return this.http.get<Section[]>(`${API_ORIGIN}/api/Section/instructor/${instructorName}`, API_HEADERS(accessToken));
  }

  async getByCourseId(courseId: number): Promise<Observable<Section>> {

    const accessToken = await this.oktaAuth.getAccessToken();
    return this.http.get<Section>(`${API_ORIGIN}/api/Section?courseId=${courseId}`, API_HEADERS(accessToken));
  }

  async enrollStudent(sectionId: number, studentId: number): Promise<Observable<Section>> {

    const accessToken = await this.oktaAuth.getAccessToken();

    let enrollment: Enrollment = {
      studentId: studentId,
      sectionId: sectionId
    } as Enrollment;

    return this.http.post<Section>(`${API_ORIGIN}/api/Enrollment`, { ...API_HEADERS(accessToken), ...{ body: enrollment } });
  }
}