import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import CourseApi from './CourseApi';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClassRegistrationApiService {
  
  //private baseUrl = 'https://ar-dk-ps-project2.azurewebsites.net/api/Course?PageNumber=3&PageSize=3';
  //private baseUrl = 'http://localhost:47144';
  private baseUrl = 'http://localhost:47144/api/Course?PageNumber=3&PageSize=3';
  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})

  }
  constructor(private httpClient: HttpClient) { }

  //get all courses from back-end
  public getAllCourses(): Promise<CourseApi[]> {
    return this.httpClient
      // .get<CourseApi[]>(`${this.baseUrl}/api/course`)
      .get<CourseApi[]>(`${this.baseUrl}`)
      .toPromise();
      //.pipe(map(data => data.map(data => new CourseApi().deserialize(data))));
    
  } 

  // public getById(id: number): Promise<CourseApi> {
  //   return this.httpClient
  //     // .get<CourseApi>(`${this.baseUrl}/api/course`)
  //     .get<CourseApi>(`${this.baseUrl}/api/Course/100`)
  //     .toPromise();
  // }
  
}
