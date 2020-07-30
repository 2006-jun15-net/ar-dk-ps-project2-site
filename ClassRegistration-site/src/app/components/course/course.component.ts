import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from "@angular/forms";
import { Course, Review, Section } from '../../models/models';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {

  sections: Section[]

  viewReviews: boolean = false;

  constructor(private courseService: CourseService) { }

  async searchByName(name: string) {

    (await this.courseService.getByName(name)).subscribe(
      value => this.sections = [value],
      error => console.log(error)
    )
  }

  async searchByInstructor(name: string) {

    (await this.courseService.getByInstructorName(name)).subscribe(
      value => this.sections = value,
      error => console.log(error)
    )
  }

  async searchByCourseId(id: number) {

    (await this.courseService.getByCourseId(id)).subscribe(
      value => this.sections = [value],
      error => console.log(error)
    )
  }

  /*
    //form to submit a review for a course
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
              const reviewToAdd: ReviewCreateApi = { score, text, courseId };
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
    }
  
    //register: need to use student's login
    public RegisterSection(item: SectionApi): void {
      const sectId = item.sectId;
      const studentId = 2; //need to do this with the login 
      const EnrollmentToAdd: EnrollmentCreateApi = { sectId, studentId };
      this.dbCourse.register(EnrollmentToAdd).subscribe(newRegister => {
        console.log(newRegister);
        this.theEnrollments?.push(newRegister);
      })
    }*/
}
