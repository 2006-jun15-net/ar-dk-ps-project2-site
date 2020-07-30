import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import CourseApi from './CourseApi';
import SectionApi from './SectionApi';
import ReviewApi from './ReviewApi';
import ReviewCreateApi from './ReviewCreateApi';
import EnrollmentApi from './EnrollmentApi';
import EnrollmentCreateApi from './EnrollmentCreateApi';

import { OktaAuthService } from '@okta/okta-angular';
import { API_ORIGIN, API_HEADERS } from './config';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClassRegistrationApiService {
  
  //private baseUrl = 'https://ar-dk-ps-project2.azurewebsites.net/api/Course?PageNumber=3&PageSize=3';
  private baseUrl = 'http://localhost:47144';
  //private baseUrl = 'http://localhost:47144/api/Course?PageNumber=3&PageSize=3';
  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})

  }
  constructor(private httpClient: HttpClient, private oktaAuth: OktaAuthService) { }

  //get all courses from back-end
  // public getAllCourses(): Promise<CourseApi[]> {
  //   return this.httpClient
  //     // .get<CourseApi[]>(`${this.baseUrl}/api/course`)
  //     .get<CourseApi[]>(`${this.baseUrl}/api/Course?PageNumber=3&PageSize=3`)
  //     .toPromise();
  //     //.pipe(map(data => data.map(data => new CourseApi().deserialize(data))));
    
  // } 

  public getAllCourses(): Observable<CourseApi[]> {
    return this.httpClient
      //.get<CourseApi[]>(`${this.baseUrl}/api/Course?PageNumber=3&PageSize=3`)
      .get<CourseApi[]>(`${this.baseUrl}/api/Course`)
      
    
  };

  //search a course by ID
  public getById(id: number): Observable<CourseApi> {
    return this.httpClient
      // .get<CourseApi>(`${this.baseUrl}/api/course`)
      .get<CourseApi>(`${this.baseUrl}/api/Course/${id}`);
      
  }

  //search a course by name
  public getCourseByName(term: string): Observable<CourseApi> {
    return this.httpClient.get<CourseApi>(`${this.baseUrl}/api/Course/class/${term}`);
    
  }

  //search a course by instructor ID and get the associated reviews
  public getByInstructorId(id: number): Observable<SectionApi[]> {
    return this.httpClient
      // .get<CourseApi>(`${this.baseUrl}/api/course`)
      .get<SectionApi[]>(`${this.baseUrl}/api/Section?instructorId=${id}`);
      
  }
  
  //search courses by prof's last name
  public getCourseByInstrName(term: string): Observable<SectionApi[]> {
    return this.httpClient.get<SectionApi[]>(`${this.baseUrl}/api/Section/${term}`);
    
  }

  //add a review for a course
  async addReview (userData: ReviewCreateApi): Promise<Observable<ReviewApi>> {
    const accessToken = await this.oktaAuth.getAccessToken();
    return this.httpClient.post<ReviewApi>(`${this.baseUrl}/api/Reviews`, userData, API_HEADERS(accessToken));
  }

  //register for a course
  // public register(item: EnrollmentCreateApi): Observable<EnrollmentApi> {
  //   return this.httpClient.post<EnrollmentApi>(`${this.baseUrl}/api/Enrollment`, item);
  // }

  async register(item: EnrollmentCreateApi): Promise<Observable<EnrollmentApi>> {
    const accessToken = await this.oktaAuth.getAccessToken();
    return this.httpClient.post<EnrollmentApi>(`${this.baseUrl}/api/Enrollment`, item, API_HEADERS(accessToken));
  }

  //courses for pagination
  public coursesWithPagination(item: number, item2: number): Observable<CourseApi[]> {
    return this.httpClient.get<CourseApi[]>(`${this.baseUrl}/api/Course?PageNumber=${item}&PageSize=${item2}`);
  }
  
  
  
}
