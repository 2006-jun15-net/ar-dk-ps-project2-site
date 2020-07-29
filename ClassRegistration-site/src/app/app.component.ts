import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { StudentService } from './student.service';
import { Course, Student, Enrollment } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Class Registration';

  isAuthenticated: boolean;
  courses: Enrollment[];
  student: Student;

  constructor(public oktaAuth: OktaAuthService, private studentService: StudentService) {

    this.oktaAuth.$authenticationState.subscribe(

      (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  async ngOnInit() {

    console.log("NG INIT");
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    if (this.isAuthenticated) {

      const subscription = await this.studentService.getStudent();

      subscription.subscribe(
        value => {
          this.student = value as Student;
          localStorage['studentId'] = this.student.studentId;
        },
        error => console.log(error)
      );
    }
  }

  login() {
    this.oktaAuth.loginRedirect('/');
  }

  logout() {
    this.oktaAuth.logout('/');
  }

  async getCourses() {
    return await this.studentService.getEnrollments(this.student.studentId);
  }
}
