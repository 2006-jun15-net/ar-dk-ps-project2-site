import { Component, OnInit } from '@angular/core';
import { ClassRegistrationApiService} from '../class-registration-api.service';
import CourseApi from '../CourseApi';
import SectionApi from '../SectionApi';
import ReviewApi from '../ReviewApi';
import ReviewCreateApi from '../ReviewCreateApi';

import { Location } from '@angular/common';
import { FilterCoursePipe } from '../filter-course.pipe';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';


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
  public theCourses4: SectionApi[] | null = null;
  public theReviews: ReviewApi[] | null = null;

  public courseName: string | null = null;
  public courseId: number | null = null;
  courses$: Observable<CourseApi[]>;
  //course$: Observable<CourseApi>;
  private searchText = new Subject<string>();
  private searchNumber = new Subject<number>();

  id: number = 0;
  idProf: number = 0;
  profName: string = 'ex. Harrison'
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

  addReviewForm = new FormGroup( {
    term: new FormControl(),
    item: new FormControl(),
    comment: new FormControl()
  });


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
  

  public getByInstrName (term: string): void {
    this.dbCourse.getCourseByInstrName(this.profName)
    .subscribe((classes) =>  {
      console.log(classes);
      this.theCourses4 = classes;
    })
  }

  // public addCourseReview (term: string, item: number, comment: string): void {
  //   this.dbCourse.addReview(term, item.value, comment.value).subscribe(newReview => {
  //     this.theReviews.push(newReview);
  //   })
  // }
}

 