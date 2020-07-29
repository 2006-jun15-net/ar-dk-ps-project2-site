import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student, Course } from '../../models/models';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  // creating a course array that holds enrollments
  courses: Course[] = [];

  // declaring a variable to hold amount owed
  amount: number = 0;

  // semester variable
  semester: string = '';

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

        (await this.studentService.getCourses(value.studentId)).subscribe(

          value => {
            console.log(value); this.courses = value;
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
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

  // getting credits
  async getTotalCredits() {

    if (this.student === undefined) {
      return;
    }

    let studentId = this.student.studentId;

    (await this.studentService.getTotalCredits(studentId, this.semester))
      .subscribe(data => this.totalCredits = data)
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
