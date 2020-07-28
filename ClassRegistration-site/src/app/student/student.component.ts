import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';
import { Student } from '../student-model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  response: string;
  student: Student;

  constructor(public oktaAuth: OktaAuthService, private http: HttpClient) {
    this.response = "";
  }

  ngOnInit(): void { }

  async fetchResponse(uri: string) {

    const accessToken = await this.oktaAuth.getAccessToken();

    const request = this.http.get(uri, {

      headers: {
        Authorization: 'Bearer ' + accessToken
      },
      withCredentials: true

    });

    request.subscribe(

      value => {

        console.log(value);
        this.response = JSON.stringify(value);
        this.student = value as Student;
      },

      error => {

        if (error.status == 401) {
          this.oktaAuth.loginRedirect('/');
        }
        this.response = JSON.stringify(error);
      },

      () => { console.log('done!'); }
    )
  }

  async getStudent() {
    await this.fetchResponse("http://localhost:47144/api/student?FirstName=Paul&LastName=Smith");
  }

  async getCourses() {
    await this.fetchResponse(`http://localhost:47144/api/student/${this.student.studentId}/courses`);
  }
}
