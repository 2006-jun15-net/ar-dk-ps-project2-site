import { Component, OnInit } from '@angular/core';
import { ClassRegistrationApiService} from '../class-registration-api.service';
import CourseApi from '../CourseApi';
import SectionApi from '../SectionApi';
import ReviewApi from '../ReviewApi';
import ReviewCreateApi from '../ReviewCreateApi';
import EnrollmentApi from '../EnrollmentApi';
import EnrollmentCreateApi from '../EnrollmentCreateApi';
import { OktaAuthService } from '@okta/okta-angular';
import { StudentService } from '../services/student.service';
import  { Student } from '../models/models';

import { Location } from '@angular/common';
import { Injectable, TemplateRef } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators} from "@angular/forms";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ViewChild, ElementRef } from '@angular/core';

// interface Alert {
//   type: string;
//   message: string;
// }

// const ALERT: Alert = {
//   type: 'success',
//   message: 'Successful!',
// }

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  @ViewChild ('alert', { static: true }) alert: ElementRef | undefined = undefined;
  // theAlert: Alert;
  

  toasts: any;

  public theCourses: CourseApi[] | null = null;
  public theCourse: CourseApi | null = null;
  public theCourse2: CourseApi | null = null;
  public theCourses3: SectionApi[] | null = null;
  public theCourses4: SectionApi[] | null = null;
  public theReviews: ReviewApi[] | null = null;
  public theEnrollments: EnrollmentApi[] | null = null;


  page: number = 1;
  pageSize: number = 4;
  //collectionSize = this.theCourses?.length;
  thetablecourses: CourseApi[] | null = null;


  ViewReviews: boolean = false;
  ReviewSubmitForm: boolean = false;


  form = this.fb.group({
    term: ['', Validators.required],
  });

  form2 = this.fb.group({
    item: ['', Validators.required],
    comment: ['', Validators.required],
    courseInfo: ['', Validators.required],
  });



  public courseName: string | null = null;
  public courseId: number | null = null;
  //courses$: Observable<CourseApi[]>;
  
  private searchText = new Subject<string>();
  //private searchNumber = new Subject<number>();

  id: number = 0;
  idProf: number = 0;
  profName: string = 'ex. Erickson'
  thePlaceHolder: string = "start searching for a course by its ID number"
 
 
  isAuthenticated: boolean = true;
  student: Student | undefined = undefined;
 
  constructor(private dbCourse: ClassRegistrationApiService, private location: Location, private fb: FormBuilder, private oktaAuth: OktaAuthService,
    private studentservice: StudentService) { 
  
   this.refreshCourses();
    // this.oktaAuth.$authenticationState.subscribe(
    //   isAuthenticated => this.isAuthenticated = isAuthenticated
    // );

  }
  

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    if (this.isAuthenticated) {
      (await this.studentservice.getStudentDetails()).subscribe(
        value => {
          this.student = value;
          localStorage['studentId'] = value.studentId;

          
        },
        error => console.log(error)
      );
    }
  }


  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  // remove(toast) {
  //   this.toasts = this.toasts.filter(t => t !== toast);
  // }
  

  showSuccess() {
    this.show('You successfully registered!', { classname: 'bg-success text-light', delay: 10000 });
  }
  

  
  search(term: string): void {
    this.searchText.next(term);
  }

  // searchID(id: number): void {
    
  //   this.searchNumber.next(id);
  // }

  
 
  //get all courses available
  public loadAllCourses(): void {
    this.dbCourse 
      .getAllCourses()
      .subscribe((classes) =>  {
        console.log(classes);
        this.theCourses = classes;

      })
  }

  //for pagination
  public refreshCourses() { 
    this.dbCourse
      .coursesWithPagination(this.page, this.pageSize)
      .subscribe((response) => {
        this.thetablecourses = response
        //.map((class, i) => ({courseId: i + 1, ...class}))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * 
          this.pageSize * this.pageSize);

      
    })

   
  }

  closeAlert() {
    this.alert?.nativeElement.classList.remove('show');
  }

  openAlert() {
    this.alert?.nativeElement.classList.add('show');
  }

  
       

  // ngOnInit(): void {
  //   this.loadAllCourses().then();
  // }


  //return to home page
  goBack(): void {
    this.location.back();
  }

  //search courses by ID number
  public getCourseById (id: number): void {
    this.dbCourse.getById(this.id)
    .subscribe((classes) =>  {
      console.log(classes);
      this.theCourse2 = classes;
    })
  }

  //search courses by name
  public getCourseBytheName (term: string): void {
    this.dbCourse.getCourseByName(term)
    .subscribe((classes) =>  {
      //console.log(classes);
      this.theCourse = classes;
    })
  }

  

  //search courses by professor: gives access to section ID and any reviews
  public getByInstrName (term: string): void {
    this.dbCourse.getCourseByInstrName(this.profName)
    .subscribe((classes) =>  {
      console.log(classes);
      this.theCourses4 = classes;
    })
  }

  
  //form to submit a review for a course
  // public submitReviewForm(): void {
  //   const thename = this.form.get('term');
  //   if (thename) {
  //     const name = thename.value as string;
  //     const theScore = this.form2.get('item');
  //     if (theScore) {
  //       const score = theScore.value as number;
  //       const theText = this.form2.get('comment');
  //       if (theText) {
  //         const text = theText.value as string;
  //         const thecourseID = this.form2.get('courseInfo');
  //         if (thecourseID) {
  //           const courseId = thecourseID.value as number;
  //           const reviewToAdd: ReviewCreateApi = { score, text, courseId};
  //           this.dbCourse.addReview(name, reviewToAdd).subscribe(newReview => {
  //             console.log(newReview);
  //             this.theReviews?.push(newReview);
  //             this.form.reset();
  //             this.form2.reset();
  //           })
  //         }
  //       }
  //     }

  //   }
    
    
  // }

  //submit a review if user is authorized
  async submitReviewForm() {

    if (this.student === undefined) {
      return;
    }
  
    const studentId = this.student.studentId;

    
      const theScore = this.form2.get('item');
      if (theScore) {
        const score = theScore.value as number;
        const theText = this.form2.get('comment');
        if (theText) {
          const text = theText.value as string;
          const thecourseID = this.form2.get('courseInfo');
          if (thecourseID) {
            const courseId = thecourseID.value as number;
            const reviewToAdd: ReviewCreateApi = { score, text, courseId, studentId};
            return (await this.dbCourse.addReview(reviewToAdd)).subscribe(newReview => {
              console.log(newReview);
              this.theReviews?.push(newReview);
              this.form2.reset();
            })
          }
        }
      }

    }
    
    
  
 
  

  //register: need to use student's login
  // public RegisterSection (item: SectionApi): void {
  //   const sectId = item.sectId;
  //   const studentId = 2; //need to do this with the login 
  //   const EnrollmentToAdd: EnrollmentCreateApi = { sectId , studentId };
  //   this.dbCourse.register(EnrollmentToAdd).subscribe(newRegister => {
  //     console.log(newRegister);
  //     this.theEnrollments?.push(newRegister);
  //   }) 
  // }

 
  //register for a course if authorized
  async RegisterForSection (item: SectionApi) {
    // if (!this.isAuthenticated || this.student === null) {
    //   this.login();
    // }
    if (this.student === undefined) {
      return;
    }
  
    const studentId = this.student.studentId;

    const sectId = item.sectId;
    
    const EnrollmentToAdd: EnrollmentCreateApi = { sectId , studentId };
    return (await this.dbCourse.register(EnrollmentToAdd)).subscribe(newRegister => {
      console.log(newRegister);
      this.theEnrollments?.push(newRegister);

      //this.alert?.nativeElement.classList.add('show');
    }) 
    
    //this.openAlert();
  }


  login() {
    this.oktaAuth.loginRedirect('/');
  }




  
  
}
