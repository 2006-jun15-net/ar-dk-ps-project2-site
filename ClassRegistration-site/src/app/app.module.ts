import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG } from '@okta/okta-angular';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

const authConfig =
{
  issuer: 'https://dev-638266.okta.com/oauth2/default',
  redirectUri: location.origin + '/implicit/callback',
  clientId: '0oan3a2afYLWJgufo4x6',
  pkce: true,
  scopes: ['openid', 'profile', 'email']

};

const routes: Routes = [
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  }
]

@NgModule({
  declarations: [
    AppComponent
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
