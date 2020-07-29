import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Course} from '../models/course';
import {StudentDetails} from '../models/studentDetails';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  //getting student details
  getStudentDetails(name:string):Observable<StudentDetails>{
    return this.http.get<StudentDetails>(`http://localhost:47144/api/Student/${name}`)
  }


  //getting courses of a particular student
  getCourses(id:number):Observable<Course[]>{
    return this.http.get<Course[]>(`http://localhost:47144/api/Student/${id}/courses`)
  }

  //getting total amount owed 
  getAmount(id:number, semester:string):Observable<any>{
    return this.http.get<any>(`http://localhost:47144/api/Student/${id}/${semester}`)
  }

  //geeting the discount based on the resident type
  getDiscount(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:47144/api/Student/${id}/discount`)
  }

  //getting credits for a student in a specified term
  getTotalCredits(id:number, semester:string):Observable<any>{
    return this.http.get<any>(`http://localhost:47144/api/Enrollment/${id}/${semester}`)
  }

 

  
}
