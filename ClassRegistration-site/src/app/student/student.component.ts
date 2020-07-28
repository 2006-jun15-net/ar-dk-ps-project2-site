import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Student } from '../student-model';
import { FetchDataService } from '../fetch-data.service'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  response: string;
  student: Student;

  constructor(private fetchService: FetchDataService) {
    this.response = "";
  }

  ngOnInit(): void { }

  async getStudent() {

    let response = await this.fetchService.response<Student>(
      "http://localhost:47144/api/student?FirstName=Paul&LastName=Smith"
    )

    response.subscribe(
      value => this.student = value,
      error => this.response = JSON.stringify(error)
    );
  }

  async getCourses() {

    let response = await this.fetchService.response(
      `http://localhost:47144/api/student/${this.student.studentId}/courses`
    )

    response.subscribe(
      value => this.response = JSON.stringify(value),
      error => this.response = JSON.stringify(error)
    );
  }
}
