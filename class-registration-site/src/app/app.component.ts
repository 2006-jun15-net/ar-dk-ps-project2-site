import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Class Registration App';
  isAuthenticated: boolean = false;

  constructor(private oktaAuth: OktaAuthService, private studentService: StudentService) {

    oktaAuth.$authenticationState.subscribe(

      isAuthenticated => {

        this.isAuthenticated = isAuthenticated;

        if (this.isAuthenticated) {

          this.studentService.fetchStudentDetails().then(
            service => service.subscribe(

              value => localStorage['studentId'] = value.studentId,
              error => console.log(error)
            )
          );
        }
      }
    );
  }

  async ngOnInit() {

    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    if (!this.isAuthenticated) {
      this.oktaAuth.loginRedirect('/');
    }

    if (this.isAuthenticated) {

      (await this.studentService.fetchStudentDetails()).subscribe(

        value => localStorage['studentId'] = value.studentId,
        error => console.log(error)
      );
    }
  }

  logout() {
    this.oktaAuth.logout('/');
  }
}
