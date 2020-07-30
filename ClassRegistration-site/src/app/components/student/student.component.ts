import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student, Course, Enrollment } from '../../models/models';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  // declaring a variable to hold amount owed
  amount: number = 0;

  // semester variable
  semester: string = "fall";

  // discount variable
  discount: number = 0;

  // final amount
  finalAmount: number = 0;

  // variable to hold total credits
  totalCredits: number = 0;

  student: Student | undefined = undefined;

  constructor(private studentService: StudentService) { }

  async ngOnInit() {

    (await this.studentService.getStudentDetails()).subscribe(

      async value => {

        this.student = value;
        localStorage['studentId'] = value.studentId;

        (await this.studentService.getDiscount(value.studentId)).subscribe(

          value => this.discount = value,
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }

  getTermEnrollments() {

    let enrollments: Enrollment[] = [];

    if (this.student !== undefined) {

      if (!this.student.enrollment || this.student.enrollment.length === 0) {
        return enrollments;
      }

      for (let index in this.student.enrollment) {

        let enroll = this.student.enrollment[index];

        if (enroll.section.term == this.semester) {
          enrollments.push(enroll);
        }
      }
    }

    return enrollments;
  }

  getTermCredits() {

    let enrollmentsForTerm = this.getTermEnrollments();

    if (enrollmentsForTerm.length === 0) {
      return 0;
    }

    let credits = enrollmentsForTerm.map((value: Enrollment) => value.section.course.credits);

    return credits.reduce((acc, cur) => acc + cur, 0);
  }

  // getting amount owed
  async getAmount() {

    if (this.student === undefined) {
      return;
    }

    let studentId = this.student.studentId;

    (await this.studentService.getAmount(studentId, this.semester))
      .subscribe(data => this.amount = data)
  }

  // final Amount to be paid after discount
  getFinalAmount() {

    if (this.amount < this.discount) {

      this.finalAmount = 0
      return this.finalAmount;
    }

    this.finalAmount = this.amount - this.discount

    return this.finalAmount;
  }
}
