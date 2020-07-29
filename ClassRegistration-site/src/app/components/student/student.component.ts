import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Course, Student } from '../../models/models';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  studentId: number = 0;

  //creating a course array that holds courses
  courses: Course[];

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

  constructor(private studentService: StudentService) {

    if ('studentId' in localStorage) {
      this.studentId = localStorage['studentId'];
    }
  }

  async ngOnInit() {

  }

  //getting courses of a particular student
  getCourses() {

    if (this.studentId === 0) {
      // error
    }

    return this.studentService.getCourses(this.studentId)
      .subscribe(data => this.courses = data);
  }

  //getting amount owed
  getAmount() {

    if (this.studentId === 0) {
      // error
    }

    return this.studentService.getAmount(this.studentId, this.semester)
      .subscribe(data => this.amount = data)
  }


  //getting the discount.
  getDiscount() {
    return this.studentService.getDiscount(this.studentId)
      .subscribe(data => this.discount = data)
  }

  //final Amount to be paid after discount
  getFinalAmount() {

    if (this.amount < this.discount) {

      this.finalAmount = 0
      return this.finalAmount;
    }

    this.finalAmount = this.amount - this.discount

    return this.finalAmount;

  }


  //getting credits
  getTotalCredits() {
    return this.studentService.getTotalCredits(this.details.studentId, this.semester)
      .subscribe(data => this.totalCredits = data)
  }

  ngOnInit(): void {


  }



}
