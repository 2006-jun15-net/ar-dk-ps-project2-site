import { Component, OnInit } from '@angular/core';
import { ClassRegistrationApiService} from '../class-registration-api.service';
import CourseApi from '../CourseApi';
import SectionApi from '../SectionApi';
import ReviewApi from '../ReviewApi';
import ReviewCreateApi from '../ReviewCreateApi';
import EnrollmentApi from '../EnrollmentApi';
import EnrollmentCreateApi from '../EnrollmentCreateApi';
import ReviewDisplayApi from '../ReviewDisplayApi';

import { Location } from '@angular/common';
import { FilterCoursePipe } from '../filter-course.pipe';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators} from "@angular/forms";


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
  public theEnrollments: EnrollmentApi[] | null = null;


  form = this.fb.group({
    term: [''],
  });

  form2 = this.fb.group({
    item: [''],
    comment: [''],
    courseInfo: [''],
  });


  form3 = this.fb.group({
    term: [''],
    item: [''],
    section: [''],
  });

  public courseName: string | null = null;
  public courseId: number | null = null;
  courses$: Observable<CourseApi[]>;
  //course$: Observable<CourseApi>;
  private searchText = new Subject<string>();
  private searchNumber = new Subject<number>();

  id: number = 0;
  idProf: number = 0;
  profName: string = 'ex. Erickson'
  thePlaceHolder: string = "start searching for a course by its ID number"
 
 
  
  // constructor(private dbCourse: ClassRegistrationApiService, private location: Location, private filter: FilterCoursePipe) { }
 
  constructor(private dbCourse: ClassRegistrationApiService, private location: Location, private fb: FormBuilder) { 
  
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
  

  public getByInstrName (term: string): void {
    this.dbCourse.getCourseByInstrName(this.profName)
    .subscribe((classes) =>  {
      console.log(classes);
      this.theCourses4 = classes;
    })
  }

  
  //submit a review for a course
  public submitReviewForm(): void {
    const thename = this.form.get('term');
    if (thename) {
      const name = thename.value as string;
      const theScore = this.form2.get('item');
      if (theScore) {
        const score = theScore.value as number;
        const theText = this.form2.get('comment');
        if (theText) {
          const text = theText.value as string;
          const thecourseID = this.form2.get('courseInfo');
          if (thecourseID) {
            const courseId = thecourseID.value as number;
            const reviewToAdd: ReviewCreateApi = { score, text, courseId};
            this.dbCourse.addReview(name, reviewToAdd).subscribe(newReview => {
              console.log(newReview);
              this.theReviews?.push(newReview);
              this.form.reset();
              this.form2.reset();
            })
          }
        }
      }

    }
    

    
  
    //formData2.append("term");

    // this.form.get('item');
    // formData.append("item");
    // this.form.get('comment');
    // formData.append("comment");
    // this.form.get('courseInfo');
    // formData.append("courseInfo");
    //formData.append("term" , this.form.get('term').value);
    // formData.append("item", this.form.get('item').value);
    // formData.append("comment", this.form.get('comment').value);
    // formData.append("courseInfo", this.form.get('courseInfo').value);
    
  }

  //register for a course
  // public submitRegisterForm(): void {
  //   const thestudentname = this.form3.get('term');
  //   if (thestudentname) {
  //     const name = thestudentname.value as string;
  //     const thecoursename = this.form3.get('item');
  //     if (thecoursename) {
  //       const coursename = thecoursename.value as string;
  //       const thesectionID = this.form3.get('section');
  //       if (thesectionID) {
  //         const sectId = thesectionID.value as number;
  //         const EnrollmentToAdd: EnrollmentCreateApi = { sectId };
  //         this.dbCourse.registerCourse(name, coursename, EnrollmentToAdd).subscribe(newRegister => {
  //           console.log(newRegister);
  //           this.theEnrollments?.push(newRegister);
  //           this.form3.reset();
  //         }) 
  //       }
  //     }
  //   }
  // } 


  //register: need to use student's login
  public RegisterSection (item: SectionApi): void {
    const sectId = item.sectId;
    const studentId = 2; //need to do this with the login
    const EnrollmentToAdd: EnrollmentCreateApi = { sectId , studentId };
    this.dbCourse.register(EnrollmentToAdd).subscribe(newRegister => {
      console.log(newRegister);
      this.theEnrollments?.push(newRegister);
    })
  }



  public loadReviews(item: SectionApi): void{
    if (item.course.reviews) {
      item.course.reviews.forEach(element => {
        const score = element.score as number;
        const text = element.text as string;
        const date = element.date as Date;

        const ReviewsToShow: ReviewDisplayApi = { score, text, date };
        return ReviewsToShow;
      });
      
    }
    
  }
  
  
}
