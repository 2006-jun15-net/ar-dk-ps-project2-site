import { Component, OnInit } from '@angular/core';
import { ClassRegistrationApiService} from '../class-registration-api.service';
import CourseApi from '../CourseApi';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {

  public theCourses: CourseApi[] | null = null;
  public theCourse: CourseApi | null = null;;
  public courseName: string | null = null;;
  

  // theCourses: CourseApi [] = [
  //   { courseName: "Electronics",
  //   courseId: 100,
  //   studentId: 1,
  //   deptId: 1800,
  //   credits: 3,
  //   fees: 1000,
  //   reviews: [] },
  //   { courseName: "Fluids",
  //   courseId: 200,
  //   studentId: 1,
  //   deptId: 1600,
  //   credits: 3,
  //   fees: 1000,
  //   reviews: [] }
  // ]; 

  
  constructor(private dbCourse: ClassRegistrationApiService, private location: Location) { }
 
  public loadAllCourses(): Promise<void> {
    return this.dbCourse
      .getAllCourses()
      .then((classes) =>  {
        console.log(classes);
        this.theCourses = classes;
      })
  }

  // ngOnInit() {
  //   // this.loadAllCourses();
  //   this.dbCourse
  //     .getAllCourses()
  //     .subscribe((classes) =>  {
  //       console.log(classes);
  //       this.theCourse = classes['theCourse'];
  //     });
  // }
  // constructor() {}



  // ngOnInit(): void {
  //   this.loadAllCourses().then();
  // }

  goBack(): void {
    this.location.back();
  }

  // public getCourseById (id: number) {
  //   this.dbCourse.getById(id)
  //   .then((classes) =>  {
  //     //console.log(classes);
  //     this.theCourse = classes;
  //   })
  //}
 
}
 