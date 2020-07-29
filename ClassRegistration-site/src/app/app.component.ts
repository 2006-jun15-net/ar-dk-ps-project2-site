import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { StudentService } from './student.service';
import { Student } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Class Registration';

  isAuthenticated: boolean;
  student: Student;

  constructor(public oktaAuth: OktaAuthService, private studentService: StudentService) {

    this.oktaAuth.$authenticationState.subscribe(

      (isAuthenticated: boolean) => {

        this.studentService.fetchStudent().then(_ => { });
        this.isAuthenticated = isAuthenticated;
      }
    );

    this.studentService.getStudent().subscribe(
      student => this.student = student
    );
  }

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  login() {
    this.oktaAuth.loginRedirect('/');
  }

  logout() {
    this.oktaAuth.logout('/');
  }
}
