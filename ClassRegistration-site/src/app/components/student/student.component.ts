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

  isAuthenticed: boolean;

  //creating a course array that holds courses
  courses: Enrollment[];

  //declaring a variable to hold amount owed
  amount: number = 0;

  //last name of a student.
  name: string = '';

  //semester variable
  semester: string = '';

  //discount variable
  discount: number = 0;

  //final amount
  finalAmount: number = 0;

  //variable to hold total credits
  totalCredits: number = 0;

  constructor(private oktaAuth: OktaAuthService, private studentService: StudentService) {

    this.oktaAuth.$authenticationState.subscribe(
      isAuthenticated => {

        this.studentService.getStudentDetails().then(

          service => service.subscribe(
            value => localStorage['studentId'] = value.studentId
          )
        )

        // Authentication state should not be available until StudentId is fetched and stored
        this.isAuthenticed = isAuthenticated;
      }
    );
  }

  async ngOnInit() {
    this.isAuthenticed = await this.oktaAuth.isAuthenticated();
  }

  //getting courses of a particular student
  async getCourses() {

    if (!this.isAuthenticed) {
      this.oktaAuth.loginRedirect('/');
    }

    let studentId = localStorage['studentId'];

    return (await this.studentService.getCourses(studentId))
      .subscribe(data => this.courses = data);
  }

  //getting amount owed
  async getAmount() {

    if (!this.isAuthenticed) {
      this.oktaAuth.loginRedirect('/');
    }

    let studentId = localStorage['studentId'];

    return (await this.studentService.getAmount(studentId, this.semester))
      .subscribe(data => this.amount = data)
  }

  //getting the discount.
  async getDiscount() {

    if (!this.isAuthenticed) {
      this.oktaAuth.loginRedirect('/');
    }

    let studentId = localStorage['studentId'];

    return (await this.studentService.getDiscount(studentId))
      .subscribe(data => this.discount = data)
  }

  //final Amount to be paid after discount
  getFinalAmount() {

    if (!this.isAuthenticed) {
      this.oktaAuth.loginRedirect('/');
    }

    if (this.amount < this.discount) {

      this.finalAmount = 0
      return this.finalAmount;
    }

    this.finalAmount = this.amount - this.discount

    return this.finalAmount;
  }

  //getting credits
  async getTotalCredits() {

    if (!this.isAuthenticed) {
      this.oktaAuth.loginRedirect('/');
    }

    let studentId = localStorage['studentId'];

    return (await this.studentService.getTotalCredits(studentId, this.semester))
      .subscribe(data => this.totalCredits = data)
  }
}
