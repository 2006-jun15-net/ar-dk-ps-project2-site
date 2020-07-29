import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Course, Student, Enrollment } from '../../models/models';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  isAuthenticated: boolean;

  // creating a course array that holds enrollments
  enrollments: Enrollment[];

  // declaring a variable to hold amount owed
  amount: number = 0;

  // last name of a student.
  name: string = '';

  // semester variable
  semester: string = '';

  // discount variable
  discount: number = 0;

  // final amount
  finalAmount: number = 0;

  // variable to hold total credits
  totalCredits: number = 0;

  student: Student = null;

  constructor(private oktaAuth: OktaAuthService, private studentService: StudentService) {

    this.oktaAuth.$authenticationState.subscribe(
      isAuthenticated => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {

    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    if (this.isAuthenticated) {

      (await this.studentService.getStudentDetails()).subscribe(

        value => {

          this.student = value;
          localStorage['studentId'] = value.studentId;

          this.studentService.getDiscount(value.studentId).then(

            service => service.subscribe(

              value => this.discount = value,
              error => console.log(error)
            )
          )
        },
        error => console.log(error)
      );
    }
  }

  // getting courses of a particular student
  async getEnrollments() {

    if (!this.isAuthenticated || this.student === null) {
      this.login();
    }

    let studentId = this.student.studentId;

    return (await this.studentService.getCourses(studentId))
      .subscribe(data => this.enrollments = data);
  }

  // getting amount owed
  async getAmount() {

    if (!this.isAuthenticated || this.student === null) {
      this.login();
    }

    let studentId = this.student.studentId;

    return (await this.studentService.getAmount(studentId, this.semester))
      .subscribe(data => this.amount = data)
  }

  // getting the discount.
  async getDiscount() {

    if (!this.isAuthenticated || this.student === null) {
      this.login();
    }

    let studentId = this.student.studentId;

    return (await this.studentService.getDiscount(studentId))
      .subscribe(data => this.discount = data)
  }

  // getting credits
  async getTotalCredits() {

    if (!this.isAuthenticated || this.student === null) {
      this.login();
    }

    let studentId = this.student.studentId;

    return (await this.studentService.getTotalCredits(studentId, this.semester))
      .subscribe(data => this.totalCredits = data)
  }

  // final Amount to be paid after discount
  getFinalAmount() {

    if (!this.isAuthenticated || this.student === null) {
      this.login()
    }

    if (this.amount < this.discount) {

      this.finalAmount = 0
      return this.finalAmount;
    }

    this.finalAmount = this.amount - this.discount

    return this.finalAmount;
  }

  login() {
    this.oktaAuth.loginRedirect('/');
  }

  logout() {
    this.oktaAuth.logout('/');
  }
}
