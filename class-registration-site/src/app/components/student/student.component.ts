import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student, Enrollment, Review } from '../../models/models';
import { OktaAuthService } from '@okta/okta-angular';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  // semester variable
  public term!: string;

  // discount variable
  public discount: number = 0;
  public credits: number = 0;
  public amount: number = 0;

  public student!: Student;
  public enrollments!: Enrollment[];

  public reviewTextValidated: boolean = true;

  private courseId!: number;

  constructor(private studentService: StudentService, private route: ActivatedRoute,
    private modalService: NgbModal) {

    this.route.params.subscribe(

      value => {

        this.term = value.term
        this.fetchAndUpdate();
      }
    );
  }

  ngOnInit() {

    this.studentService.fetchStudentDetails().then(

      service => service.subscribe(

        value => {

          this.student = value;
          this.fetchAndUpdate();
        },

        error => console.log(error)
      )
    );
  }

  private fetchAndUpdate() {

    if (this.student === undefined) {
      return;
    }

    let studentId = this.student.studentId;

    this.studentService.getAmount(studentId, this.term).then(

      service => service.subscribe(

        value => this.amount = value,
        error => console.log(error)
      )
    );

    this.studentService.getDiscount(studentId).then(

      service => service.subscribe(

        value => this.discount = value,
        error => console.log(error)
      )
    );

    this.studentService.getEnrollments(studentId, this.term).then(

      service => service.subscribe(

        value => this.enrollments = value,
        error => console.log(error)
      )
    );
  }

  openModal(modal: any, courseId: number) {

    this.reviewTextValidated = true;
    this.courseId = courseId;

    this.modalService.open(modal, { ariaLabelledBy: 'review-modal-title' });
  }

  submitReview(reviewBody: any) {

    if (this.student === undefined) {
      return;
    }

    if (reviewBody.text.length == 0 || reviewBody.text.length >= 2000) {

      this.reviewTextValidated = false;
      return;
    }

    this.studentService.createReview(reviewBody.text,
      parseInt(reviewBody.score), this.courseId, this.student.studentId).then(

        service => service.subscribe(

          value => console.log(value),
          error => console.log(error)
        )
      );

    this.modalService.dismissAll();
  }

  deleteEnrollment(enrollmentId: number) {

    if (this.student === undefined) {
      return;
    }

    this.studentService.deleteEnrollment(enrollmentId, this.student.studentId).then(

      service => service.subscribe(

        value => {

          console.log(value);
          this.fetchAndUpdate();
        },
        error => console.log(error)
      )
    )
  }
}
