import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Class Registration App';
  isAuthenticated: boolean = false;

  constructor(private oktaAuth: OktaAuthService) {

    oktaAuth.$authenticationState.subscribe(
      isAuthenticated => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {

    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    if (!this.isAuthenticated) {
      this.oktaAuth.loginRedirect('/');
    }
  }

  logout() {
    this.oktaAuth.logout('/');
  }
}
