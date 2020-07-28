import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Class Registration';

  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService) {

    console.log(location.origin);

    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
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
