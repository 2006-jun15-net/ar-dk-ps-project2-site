import { Component, OnInit } from '@angular/core';
import { ClassRegistrationApiService} from '../class-registration-api.service';
import CourseApi from '../CourseApi';
import SectionApi from '../SectionApi';
import { Location } from '@angular/common';
import { FilterCoursePipe } from '../filter-course.pipe';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {

  public theCourses: CourseApi[] | null = null;
  public theCourse: CourseApi | null = null;
  public theCourse2: CourseApi | null = null;
  public theCourses3: SectionApi[] | null = null;

  public courseName: string | null = null;
  public courseId: number | null = null;
  courses$: Observable<CourseApi[]>;
  //course$: Observable<CourseApi>;
  private searchText = new Subject<string>();
  private searchNumber = new Subject<number>();

  id: number = 0;
  idProf: number = 0;
  thePlaceHolder: string = "start searching for a course by its ID number"
 
 
  
  // constructor(private dbCourse: ClassRegistrationApiService, private location: Location, private filter: FilterCoursePipe) { }
 
  constructor(private dbCourse: ClassRegistrationApiService, private location: Location) { 
    this.courses$ = dbCourse.getAllCourses();
  }
  
  search(term: string): void {
    this.searchText.next(term);
  }

  searchID(id: number): void {
    //var idNum: number = parseInt(id)
    this.searchNumber.next(id);
  }


  // public loadAllCourses(): Promise<void> {
  //   return this.dbCourse 
  //     .getAllCourses()
  //     .then((classes) =>  {
  //       console.log(classes);
  //       this.theCourses = classes;
  //     })
  // }


  public loadAllCourses(): void {
    this.dbCourse 
      .getAllCourses()
      .subscribe((classes) =>  {
        console.log(classes);
        this.theCourses = classes;
      })
  }


  // ngOnInit(): void {
  //   this.loadAllCourses().then();
  // }

  goBack(): void {
    this.location.back();
  }

  public getCourseById (id: number): void {
    this.dbCourse.getById(this.id)
    .subscribe((classes) =>  {
      console.log(classes);
      this.theCourse2 = classes;
    })
  }

  public getCourseBytheName (term: string): void {
    this.dbCourse.getCourseByName(term)
    .subscribe((classes) =>  {
      //console.log(classes);
      this.theCourse = classes;
    })
  }

  public getCoursesByInstructorId (id: number): void {
    this.dbCourse.getByInstructorId(id)
    .subscribe((classes) =>  {
      console.log(classes);
      this.theCourses3 = classes;
    })
  }
  
}

 