import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG } from '@okta/okta-angular';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';

const authConfig =
{
  onAuthRequired: ({ oktaAuth, router }) => {
    router.navigate(['/']);
  },
  issuer: 'https://dev-638266.okta.com/oauth2/default',
  redirectUri: location.origin + '/implicit/callback', //'http://localhost:4200/002-PUop-Zi33w850kleFnIUXVvNy2Vpx_4M7XTBBU/callback',
  clientId: '0oan3a2afYLWJgufo4x6',
  pkce: true
};

const routes: Routes = [
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    OktaAuthModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: authConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
