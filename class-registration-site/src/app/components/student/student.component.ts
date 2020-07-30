import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student, Enrollment } from '../../models/models';
import { OktaAuthService } from '@okta/okta-angular';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private oktaAuth: OktaAuthService, private studentService: StudentService, private route: ActivatedRoute) {

    this.route.params.subscribe(
      value => this.term = value.term
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

  fetchAndUpdate() {

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
}
